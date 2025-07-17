import {
  deletePetProfile,
  modifyPetProfile,
  registPetProfile,
} from '@/api/pet';
import {
  petBreedData,
  petNeutering,
  petSex,
  petSizeData,
} from '@/assets/data/pet';
import dog from '@/assets/images/default-dog-profile.svg';
import MobileTitle from '@/components/common/MobileTitle';
import SelectBox from '@/components/common/SelectBox';
import { usePetProfile } from '@/lib/hooks/usePetProfiles';
import { handleError } from '@/lib/utils/handleError';
import { petProfileSchema } from '@/lib/utils/petProfile.schema';
import { useProfileStore } from '@/stores/profileStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import DateField from '../DateField';
import InputField from '../InputField';
import RadioGroupField from '../RadioGroupField';

export default function DogProfileEditMobile() {
  const params = useParams();
  const userId = params?.userId as string;

  const selectPet = useProfileStore((state) => state.selectPet);
  const selectedPet = useProfileStore((state) => state.selectedPet);
  const toggleEditingPetProfile = useProfileStore(
    (state) => state.toggleEditingPetProfile,
  );

  const { data: profile } = usePetProfile(selectedPet ?? 0);
  const queryClient = useQueryClient();

  const { handleSubmit, register, watch, control } = useForm<PetFormValues>({
    resolver: zodResolver(petProfileSchema),
    defaultValues: profile
      ? {
          image: null,
          name: profile.name,
          breed: profile.breed,
          metday: profile.metday,
          birthday: profile.birthday,
          size: profile.size,
          isNeutered: profile.isNeutered ? 'true' : 'false',
          sex: profile.sex ? 'true' : 'false',
          registNumber: profile.registNumber,
          weight: String(profile.weight),
        }
      : {
          image: null,
          name: '',
          breed: 'BEAGLE',
          metday: formatDate(new Date(), 'yyyy-MM-dd'),
          birthday: formatDate(new Date(), 'yyyy-MM-dd'),
          size: undefined,
          isNeutered: undefined,
          sex: undefined,
          registNumber: '',
          weight: '',
        },
  });

  const onSubmit = async (data: PetFormValues) => {
    const payload = {
      ...data,
      sex: data.sex === 'true' ? true : false,
      isNeutered: data.isNeutered === 'true' ? true : false,
      weight: data.weight ? Number(data.weight) : null,
      registNumber: data.registNumber ?? null,
      // 로그인 기능 구현 이후 자신의 userId 입력
      userId: userId,
      // 이미지 입력 값 생긴 후 수정
      image: null,
    };

    if (profile) {
      await modifyPetProfile(payload, profile.petId);
    } else {
      await registPetProfile(payload);
    }

    // 로그인 기능 구현 이후 자신의 userId 입력
    queryClient.invalidateQueries({ queryKey: ['pets', userId] });
    toggleEditingPetProfile();
    selectPet(null);
  };

  const handleDeletePet = async () => {
    if (!profile) return;

    await deletePetProfile(profile.petId);

    queryClient.invalidateQueries({ queryKey: ['pets', userId] });
    selectPet(null);
    toggleEditingPetProfile();
  };

  return (
    <main className="w-screen">
      <div className="relative h-full bg-[var(--color-background)] px-6 py-9 text-sm">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit, handleError)}
        >
          <MobileTitle
            title="반려견 등록"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
            closePage={() => {
              toggleEditingPetProfile();
              selectPet(null);
            }}
          />
          {/* 사진 선택 */}
          <div className="mb-9 flex flex-col items-center gap-4">
            <Image
              className="rounded-full"
              src={dog}
              alt="강아지 프로필"
              width={100}
              height={100}
              priority
            />
            <span className="text-[var(--color-grey)]">사진 선택하기</span>
          </div>
          <div className="flex flex-col justify-between gap-20 pb-3">
            <div className="w-full">
              <InputField
                id="name"
                label="이름"
                className="w-full"
                required
                placeholder="이름을 적어주세요 (1~10자 이내)"
                register={register}
              />
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
                      width="50%"
                      hasBorder
                      setValue={(value) => field.onChange(value)}
                      value={field.value}
                    />
                  </div>
                )}
              />
              <RadioGroupField
                className="grow"
                id="size"
                label="크기"
                options={petSizeData}
                register={register}
                watch={watch}
                required
              />
              <DateField
                control={control}
                id="birthday"
                label="태어난 날"
                required
              />
              <DateField
                control={control}
                id="metday"
                label="처음 만난 날"
                required
              />
              <RadioGroupField
                className="basis-[calc(50%-6px)]"
                id="sex"
                label="성별"
                options={petSex}
                register={register}
                watch={watch}
                required
              />
              <RadioGroupField
                className="basis-[calc(50%-6px)]"
                id="isNeutered"
                label="중성화"
                options={petNeutering}
                register={register}
                watch={watch}
                required
              />
              <InputField
                className="mr-2 w-[calc(50%-6px)]"
                id="weight"
                label="몸무게"
                placeholder="몸무게를 적어주세요"
                type="number"
                register={register}
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
        </form>
        {profile && (
          <span
            className="absolute right-6 bottom-6 cursor-pointer text-[var(--color-grey)] hover:text-[var(--color-black)]"
            onClick={handleDeletePet}
          >
            반려동물 정보 삭제
          </span>
        )}
      </div>
    </main>
  );
}
