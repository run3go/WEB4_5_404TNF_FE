import { getPetProfiles, registPetProfile } from '@/api/pet';
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
import { useProfileStore } from '@/stores/profileStore';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import DateField from '../DateField';
import InputField from '../InputField';
import RadioGroupField from '../RadioGroupField';

export default function DogProfileEdit({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const setPetProfiles = useProfileStore((state) => state.setPetProfiles);
  const { handleSubmit, register, watch, control } = useForm<PetPayload>({
    defaultValues: {
      birthday: formatDate(new Date(), 'yyyy-MM-dd'),
      metday: formatDate(new Date(), 'yyyy-MM-dd'),
    },
  });

  const onSubmit = async (data: PetPayload) => {
    const payload = {
      ...data,
      sex: data.sex === 'true' ? true : false,
      isNeutered: data.isNeutered === 'true' ? true : false,
      // 로그인 기능 구현 이후 자신의 userId 입력
      userId: '10001',
      // 이미지 입력 값 생긴 후 수정
      image: null,
    };

    await registPetProfile(payload);
    // 로그인 기능 구현 이후 자신의 userId 입력
    const profiles = await getPetProfiles('10001');
    setPetProfiles(profiles);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 사진 선택 */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={dog}
              alt="강아지 프로필"
              width={120}
              height={120}
              priority
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
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
                placeholder="몸무게를 적어주세요"
                required
                register={register}
              />
              {/* 처음 만난 날 */}
              <DateField
                control={control}
                id="metday"
                label="처음 만난 날"
                required
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
                label="생년월일"
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
                required
                register={register}
              />
            </div>
          </div>
          <Button className="w-50">수정하기</Button>
        </form>
      </div>
    </>
  );
}
