'use client';
import Icon from '@/components/common/Icon';
import { useState } from 'react';
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
  console.log(petId);
  return (
    <>
      <div
        className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
        onClick={closeModal}
      />
      <div className="absolute top-1/2 left-1/2 z-201 h-115 w-9/10 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[var(--color-background)] px-5 py-9 sm:h-[470px] sm:w-[720px]">
        <div className="flex items-center justify-between sm:mb-5">
          <h3 className="ml-3 text-lg leading-[1.2] font-extrabold sm:ml-5 sm:text-2xl">
            예방접종 정보
          </h3>
          <Icon
            onClick={closeModal}
            className="mr-1 scale-80 cursor-pointer sm:mr-5 sm:scale-90"
            width="16px"
            height="16px"
            left="-302px"
            top="-202px"
          />
        </div>
        <div className="mt-6 flex w-full flex-col text-xs sm:mt-8 sm:mb-50 sm:text-[15px]">
          <div className="mr-1 mb-5 self-end sm:mr-5">
            {isEditing ? (
              <>
                <span className="mr-3 cursor-pointer text-[var(--color-primary-500)]">
                  저장
                </span>
                <button
                  className="cursor-pointer text-[var(--color-grey)]"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </button>
              </>
            ) : (
              <span
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Icon width="14px" height="14px" left="-225px" top="-168px" />
                수정
              </span>
            )}
          </div>
          <div>
            <div className="flex w-full border-b border-[var(--color-primary-300)] py-[10px] pl-3">
              <span className="basis-5/22 sm:basis-2/11">백신이름</span>
              <span className="basis-5/22 sm:basis-3/11">유형</span>
              <span className="basis-4/11">접종일</span>
              <span className="basis-2/11 text-center sm:text-start">차수</span>
            </div>
          </div>
          <ul className="mt-2 flex w-full flex-col gap-2">
            {isEditing ? (
              <>
                <VaccineInput name="종합백신" />
                <VaccineInput name="코로나 장염" />
                <VaccineInput name="켄넬코프" />
                <VaccineInput name="인플루엔자" />
                <VaccineInput name="광견병" />
              </>
            ) : (
              <>
                <VaccineItem name="종합백신" />
                <VaccineItem name="코로나 장염" />
                <VaccineItem name="켄넬코프" />
                <VaccineItem name="인플루엔자" />
                <VaccineItem name="광견병" />
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
