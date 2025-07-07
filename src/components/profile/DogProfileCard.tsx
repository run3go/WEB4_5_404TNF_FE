'use client';

import dog from '@/assets/images/dog_img.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Card from '../common/Card';
import Icon from '../common/Icon';
import DogProfileEdit from './DogProfileEdit';

export default function DogProfileCard() {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.querySelector('#profile-container'));
  }, []);
  return (
    <Card className="card__hover w-150 p-0">
      <h3 className="rounded-t-[12px] bg-[var(--color-primary-300)] py-[18px] text-center text-xl">
        이마음
      </h3>
      <div className="flex gap-8 px-10 py-6">
        <Image
          className="rounded-[12px]"
          src={dog}
          alt="강아지 프로필"
          width={220}
          height={220}
        />
        <div className="flex flex-col justify-around">
          <div>
            <span className="mr-3 text-[var(--color-grey)]">견종</span>
            골든 리트리버 (대형견)
          </div>
          <div>
            <span className="mr-3 text-[var(--color-grey)]">나이</span>
            5년 6개월
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-[var(--color-grey)]">성별</span>
            <span>여아</span>
            <Icon
              className="mr-2 ml-1 inline-block"
              width="12px"
              height="19px"
              left="-110px"
              top="-79px"
            />
            <span>(중성화 O)</span>
          </div>
          <div>
            <span className="mr-3 text-[var(--color-grey)]">등록번호</span>
            410100012761071
          </div>
          <span>
            가족이 된지{' '}
            <strong className="font-medium text-[var(--color-primary-500)]">
              1943
            </strong>
            일
          </span>
          <button className="text- cursor-pointer self-start underline">
            예방접종 정보 보기
          </button>
        </div>
      </div>
      {/* 반려견 정보 등록/수정 (스크롤 막기 기능 구현 필요) */}
      {portalElement && createPortal(<DogProfileEdit />, portalElement)}
    </Card>
  );
}
