'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';

export default function LoadingButton() {
  const pathname = usePathname();
  const [boardType, setBoardType] = useState('question');
  useEffect(() => {
    if (pathname.includes('free')) {
      setBoardType('free');
    } else {
      setBoardType('question');
    }
  }, [pathname]);
  return (
    <>
      <div className="flex flex-none justify-center gap-3 pt-6 md:gap-9 md:pt-5">
        <Button
          className={`board__btn ${boardType === 'question' ? '!bg-[var(--color-pink-300)]' : ''}`}
        >
          <Icon
            className="scale-60 md:scale-100 dark:bg-[url('/images/sprite.svg')] md:dark:bg-[url('/images/sprite.svg')]"
            width="20px"
            height="20px"
            left="-27px"
            top="-165px"
          />
          <p className="text-sm md:text-base 2xl:text-[18px]">질문게시판</p>
        </Button>

        <Button
          className={`board__btn ${boardType === 'free' ? '!bg-[var(--color-pink-300)]' : ''}`}
        >
          <Icon
            className="scale-60 md:scale-100 dark:bg-[url('/images/sprite.svg')] md:dark:bg-[url('/images/sprite.svg')]"
            width="20px"
            height="20px"
            left="-67px"
            top="-166px"
          />
          <p className="text-sm md:text-base 2xl:text-[18px]">자유게시판</p>
        </Button>
      </div>
    </>
  );
}
