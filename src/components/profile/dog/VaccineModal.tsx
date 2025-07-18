'use client';
import { modifyVaccineData } from '@/api/pet';
import { vaccineArr } from '@/assets/data/pet';
import Icon from '@/components/common/Icon';
import { usePetVaccine } from '@/lib/hooks/usePetProfiles';
import { useVaccineForm } from '@/lib/hooks/useVaccineForm';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import VaccineInput from './VaccineInput';
import VaccineItem from './VaccineItem';

export default function VaccineModal({
  closeModal,
  petId,
}: {
  closeModal: () => void;
  petId: number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: vaccineData, refetch, isRefetching } = usePetVaccine(petId);
  const methods = useVaccineForm(vaccineData);

  const DHPPL = vaccineData?.find((data) => data.vaccine.name === 'DHPPL');
  const CORONAVIRUS = vaccineData?.find(
    (data) => data.vaccine.name === 'CORONAVIRUS',
  );
  const KENNEL_COUGH = vaccineData?.find(
    (data) => data.vaccine.name === 'KENNEL_COUGH',
  );
  const RABIES = vaccineData?.find((data) => data.vaccine.name === 'RABIES');
  const INFLUENZA = vaccineData?.find(
    (data) => data.vaccine.name === 'INFLUENZA',
  );

  const onSubmit = async (data: VaccineFormValues) => {
    const payload = Object.entries(data)
      .map((item) => ({
        name: item[0],
        ...item[1],
        vaccineAt: item[1].vaccineAt
          ? formatDate(item[1].vaccineAt, 'yyyy-MM-dd')
          : undefined,
      }))
      .filter((item) => item.count && item.vaccineAt && item.vaccineType);
    const mappedData = Object.values(data).map((item) =>
      item.count && item.vaccineAt && item.vaccineType
        ? item
        : { vaccineAt: undefined, vaccineType: 'FIRST', count: undefined },
    );

    const resetValues = mappedData.reduce(
      (acc, cur, index) => ({
        ...acc,
        [vaccineArr[index]]: cur,
      }),
      {},
    );

    if (payload) {
      await modifyVaccineData(payload as VaccinePayload[], petId);
      await refetch();
      setIsEditing(false);
    }

    methods.reset(resetValues);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="absolute top-1/2 left-1/2 z-201 h-115 w-9/10 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[var(--color-background)] px-3 py-9 sm:h-[470px] sm:w-[720px] sm:px-5">
          <div className="flex items-center justify-between sm:mb-5">
            <h3 className="ml-3 text-lg leading-[1.2] font-extrabold sm:ml-5 sm:text-2xl">
              예방접종 정보
            </h3>
            <Icon
              onClick={closeModal}
              className="mr-3 scale-80 cursor-pointer sm:mr-5 sm:scale-90"
              width="16px"
              height="16px"
              left="-302px"
              top="-202px"
            />
          </div>
          <div className="mt-6 flex w-full flex-col text-xs sm:mt-8 sm:mb-50 sm:text-[15px]">
            <div className="mr-3 mb-5 self-end sm:mr-5">
              {isEditing ? (
                <>
                  <button
                    className="mr-3 cursor-pointer text-[var(--color-primary-500)] transition-colors ease-in-out hover:text-orange-500"
                    disabled={isRefetching}
                    type="submit"
                  >
                    {isRefetching ? '저장 중...' : '저장'}
                  </button>
                  <button
                    className="cursor-pointer text-[var(--color-grey)] transition-colors ease-in-out hover:text-[var(--color-black)]"
                    disabled={isRefetching}
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <span
                  className="group flex cursor-pointer items-center gap-2 hover:text-[var(--color-primary-500)]"
                  onClick={() => setIsEditing(true)}
                >
                  <Icon
                    className="block group-hover:hidden"
                    width="14px"
                    height="14px"
                    left="-225px"
                    top="-168px"
                  />
                  <Icon
                    className="hidden group-hover:block"
                    width="14px"
                    height="14px"
                    left="-414px"
                    top="-173px"
                  />
                  수정
                </span>
              )}
            </div>
            <div>
              <div className="flex w-full border-b border-[var(--color-primary-300)] py-[10px] pl-3">
                <span className="basis-6/22 sm:basis-2/11">백신이름</span>

                <div className="basis-5/22 sm:basis-3/11 sm:pl-4">
                  <span className="inline-block w-[22px] text-center sm:w-[27px]">
                    유형
                  </span>
                </div>
                <span className="basis-4/11 sm:pl-[21px]">접종일</span>
                <span className="basis-2/11 text-center sm:pl-[26px] sm:text-start">
                  차수
                </span>
              </div>
            </div>
            <FormProvider {...methods}>
              <ul className="mt-2 flex w-full flex-col gap-2">
                {isEditing ? (
                  <>
                    <VaccineInput name="종합백신" eng="DHPPL" />
                    <VaccineInput name="코로나 장염" eng="CORONAVIRUS" />
                    <VaccineInput name="켄넬코프" eng="KENNEL_COUGH" />
                    <VaccineInput name="인플루엔자" eng="INFLUENZA" />
                    <VaccineInput name="광견병" eng="RABIES" />
                  </>
                ) : (
                  <>
                    <VaccineItem name="종합백신" vaccine={DHPPL} />
                    <VaccineItem name="코로나 장염" vaccine={CORONAVIRUS} />
                    <VaccineItem name="켄넬코프" vaccine={KENNEL_COUGH} />
                    <VaccineItem name="인플루엔자" vaccine={INFLUENZA} />
                    <VaccineItem name="광견병" vaccine={RABIES} />
                  </>
                )}
              </ul>
            </FormProvider>
          </div>
        </div>
      </form>
    </>
  );
}
