'use client';
import { usePathname } from 'next/navigation';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useEffect, useState } from 'react';

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
      <div className="flex flex-none justify-center gap-3 pt-6 sm:gap-9 sm:pt-5">
        <Button
          className={`board__btn ${boardType === 'question' ? '!bg-[var(--color-pink-300)]' : ''}`}
        >
          <Icon
            className="scale-60 sm:scale-100 dark:bg-[url('/images/sprite.svg')] sm:dark:bg-[url('/images/sprite.svg')]"
            width="20px"
            height="20px"
            left="-27px"
            top="-165px"
          />
          <p className="text-[10px] sm:pt-0.5 sm:text-[18px]">질문게시판</p>
        </Button>

        <Button
          className={`board__btn ${boardType === 'free' ? '!bg-[var(--color-pink-300)]' : ''}`}
        >
          <div className="pt-1">
            <Icon
              className="scale-60 sm:scale-100 dark:bg-[url('/images/sprite.svg')] sm:dark:bg-[url('/images/sprite.svg')]"
              width="20px"
              height="20px"
              left="-67px"
              top="-166px"
            />
          </div>
          <p className="pt-0.5 text-[10px] sm:pt-1 sm:text-[18px]">
            자유게시판
          </p>
        </Button>
      </div>
    </>
  );
}
