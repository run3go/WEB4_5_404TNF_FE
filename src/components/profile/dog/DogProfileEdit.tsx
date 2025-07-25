import { deletePetProfile } from '@/api/pet';
import {
  petBreedData,
  petNeutering,
  petSex,
  petSizeData,
} from '@/assets/data/pet';
import dog from '@/assets/images/default-dog-profile.svg';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import {
  useModifyMutation,
  usePetForm,
  useRegistMutation,
} from '@/lib/hooks/usePetForm';
import { handleError } from '@/lib/utils/handleError';
import { useAuthStore } from '@/stores/authStoe';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import DateField from '../DateField';
import InputField from '../InputField';
import RadioGroupField from '../RadioGroupField';

export default function DogProfileEdit({
  profileData,
  closeModal,
  petId,
}: {
  profileData?: PetProfile;
  closeModal: () => void;
  petId: number;
}) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [imageUrl, setImageUrl] = useState(profileData?.image || dog);

  const queryClient = useQueryClient();

  const { handleSubmit, register, watch, setValue, control } =
    usePetForm(profileData);

  const { mutate: registMutate, isPending: isRegistPending } =
    useRegistMutation(userInfo, closeModal);
  const { mutate: modifyMutate, isPending: isModifyPending } =
    useModifyMutation(userInfo, petId, closeModal);

  const onSubmit = async (data: PetFormValues) => {
    const payload = {
      ...data,
      sex: data.sex === 'true' ? true : false,
      isNeutered: data.isNeutered === 'true' ? true : false,
      weight: data.weight ? Number(data.weight) : null,
      registNumber: data.registNumber ? data.registNumber : null,
    };
    if (profileData) {
      modifyMutate({ payload, image: data.image, petId });
    } else {
      registMutate({ payload, image: data.image });
    }
  };

  const handleDeletePet = async () => {
    await deletePetProfile(petId);

    await queryClient.invalidateQueries({
      queryKey: ['pets', String(userInfo?.userId)],
    });
    closeModal();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <div className="scrollbar-hidden absolute top-1/2 left-1/2 z-201 h-9/10 w-4/5 max-w-250 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-[30px] border-4 border-[var(--color-primary-200)] bg-[var(--color-background)] px-28 py-14">
        <Icon
          onClick={closeModal}
          className="absolute top-10 right-[70px] cursor-pointer"
          width="16px"
          height="16px"
          left="-302px"
          top="-202px"
        />
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit, handleError)}
        >
          <label
            className="group mb-10 flex cursor-pointer flex-col items-center gap-4"
            htmlFor="image"
          >
            <Image
              className="h-30 w-30 rounded-full object-cover"
              src={imageUrl}
              alt="강아지 프로필"
              width={120}
              height={120}
              priority
            />
            <span className="text-[var(--color-grey)] group-hover:text-[var(--color-black)]">
              사진 선택하기
            </span>
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setValue('image', e.target.files[0]);
                setImageUrl(window.URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <div className="flex justify-between gap-20 pb-14">
            <div className="w-full">
              <InputField
                className="w-full"
                id="name"
                label="이름"
                placeholder="이름을 적어주세요 (1~10자 이내)"
                required
                register={register}
              />
              <DateField
                control={control}
                id="metday"
                label="처음 만난 날"
                required
              />
              <RadioGroupField
                id="size"
                label="크기"
                options={petSizeData}
                register={register}
                watch={watch}
                required
              />
              <RadioGroupField
                id="sex"
                label="성별"
                options={petSex}
                register={register}
                watch={watch}
                required
              />
              <InputField
                className="mr-2 w-[175px]"
                id="weight"
                label="몸무게"
                type="number"
                placeholder="몸무게를 적어주세요"
                register={register}
              />
            </div>
            <div className="w-full">
              <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                  <div className="mb-7">
                    <label className="mb-2 block" htmlFor="breed">
                      견종<span className="text-[var(--color-red)]"> *</span>
                    </label>
                    <SelectBox
                      options={petBreedData}
                      width="344px"
                      hasBorder
                      setValue={(value) => field.onChange(value)}
                      value={field.value}
                    />
                  </div>
                )}
              />
              <DateField
                control={control}
                id="birthday"
                label="태어난 날"
                required
              />
              <RadioGroupField
                id="isNeutered"
                label="중성화"
                options={petNeutering}
                register={register}
                watch={watch}
                required
              />
              <InputField
                className="mr-2 w-full"
                id="registNumber"
                label="등록번호"
                placeholder="등록번호를 적어주세요"
                type="number"
                register={register}
              />
            </div>
          </div>
          <Button
            disabled={isModifyPending || isRegistPending}
            className="w-50"
          >
            {profileData ? '수정하기' : '등록하기'}
          </Button>
        </form>
        {profileData && (
          <span
            className="absolute right-10 cursor-pointer text-[var(--color-grey)] hover:text-[var(--color-black)]"
            onClick={handleDeletePet}
          >
            반려동물 정보 삭제
          </span>
        )}
      </div>
    </>
  );
}
