'use client';
import Icon from '@/components/common/Icon';
import { Toast } from '@/components/common/Toast';
import {
  useVaccineForm,
  useVaccineMutation,
} from '@/lib/hooks/profile/useVaccineForm';
import { formatDate } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import VaccineInfo from './VaccineInfo';
import VaccineInput from './VaccineInput';
import VaccineItem from './VaccineItem';

export default function VaccineModal({
  vaccineData,
  closeModal,
  petId,
}: {
  vaccineData?: Vaccination[];
  closeModal: () => void;
  petId: number;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isTooltipOepn, setIsTooltipOepn] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { methods, reset } = useVaccineForm(vaccineData);
  const { mutate, isPending, isError, isSuccess } = useVaccineMutation(
    petId,
    () => setIsEditing(false),
  );
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
        vaccineType: item[1].vaccineType,
        vaccineAt: item[1].vaccineAt
          ? formatDate(item[1].vaccineAt, 'yyyy-MM-dd')
          : undefined,
        count: item[1].count,
      }))
      .filter((item) => item.vaccineAt && item.vaccineType);

    if (payload) {
      mutate({ payload: payload as VaccinePayload[], petId });
    }
  };

  const cancelInput = () => {
    reset(vaccineData || []);
    setIsEditing(false);
  };

  const openTooltip = () => {
    setIsTooltipOepn(true);
  };

  const closeTooltip = () => {
    setIsTooltipOepn(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeTooltip();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      Toast.success('예방접종 정보가 수정되었습니다!');
    }
    if (isError) {
      Toast.error('각 백신의 최대 차수를 확인해주세요!');
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="absolute top-1/2 left-1/2 z-201 h-115 w-9/10 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[var(--color-background)] px-3 py-9 sm:h-[470px] sm:w-[720px] sm:px-5">
          <div className="flex items-center justify-between sm:mb-5">
            <div className="flex items-center gap-2">
              <h3 className="ml-3 text-lg leading-[1.2] font-extrabold sm:ml-5 sm:text-2xl">
                예방접종 정보
              </h3>
              <div
                onClick={() => isMobile && openTooltip()}
                onMouseOver={() => isMobile || setIsTooltipOepn(true)}
                onMouseLeave={() => isMobile || setIsTooltipOepn(false)}
              >
                <Icon
                  className={`cursor-pointer ${isError && 'animate-pulse'}`}
                  width="20px"
                  height="20px"
                  left="-373px"
                  top="-255px"
                />
              </div>
            </div>
            {isTooltipOepn && <VaccineInfo ref={modalRef} />}
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
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? '저장 중...' : isError ? '재시도' : '저장'}
                  </button>
                  {!isPending && (
                    <button
                      className="cursor-pointer text-[var(--color-grey)] transition-colors ease-in-out hover:text-[var(--color-black)]"
                      disabled={isPending}
                      onClick={cancelInput}
                    >
                      취소
                    </button>
                  )}
                </>
              ) : (
                <span
                  className="group flex cursor-pointer items-center gap-2 hover:text-[var(--color-primary-500)]"
                  onClick={() => {
                    setIsEditing(true);
                    if (vaccineData) {
                      reset(vaccineData);
                    }
                  }}
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
                <span className="basis-5/22 sm:basis-2/11">백신이름</span>

                <div className="basis-5/22 pl-2 sm:basis-3/11 sm:pl-[12px]">
                  <span className="inline-block w-[22px] text-center sm:w-[27px]">
                    유형
                  </span>
                </div>
                <span className="basis-3/11 sm:basis-4/11 sm:pl-[14px]">
                  접종일
                </span>
                <span className="basis-2/11 pl-[30px] text-center sm:pl-[6px] sm:text-start">
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
