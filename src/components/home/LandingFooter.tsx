import Image from 'next/image';
import Icon from '../common/Icon';

export default function LandingFooter() {
  return (
    <footer className="bg-[#FFE1C0] px-4 py-3 sm:px-[70px] sm:py-4">
      {/* desktop */}
      <div className="hidden border-b border-b-[var(--color-input-border)] px-6 py-4 sm:block">
        <div className="flex flex-col justify-between">
          <div className="flex gap-10">
            <div>
              <Image
                className="mt-3"
                src="/images/mobile-logo.svg"
                alt="멍멍일지 로고"
                width={183}
                height={31}
                priority
              />
              <p className="dark:text-[var(--color-black)]">
                즐거운 반려견 케어의 시작
              </p>
            </div>
            <div className="border-l border-l-[var(--color-input-border)] pl-10 dark:text-[var(--color-black)]">
              <h3 className="pb-1 font-bold">404 Team Not Found</h3>
              <div className="flex pb-[2px] text-sm">
                <p className="mr-4 w-20">Frontend</p>
                <p>박정수 권유정 김태연 이민지</p>
              </div>
              <div className="flex text-sm">
                <p className="mr-4 w-20">Backend</p>
                <p>강대겸 김예원 박종욱 박현도 안세희</p>
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-end gap-1 pt-5 dark:text-[var(--color-black)]">
            <Icon width="20px" height="20px" left="-343px" top="-164px" />
            <p>GitHub 바로가기</p>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="border-b border-b-[var(--color-input-border)] pt-2 pb-3 sm:hidden">
        <div className="gap-1">
          <Image
            className="mt-1"
            src="/images/mobile-logo.svg"
            alt="멍멍일지 로고"
            width={80}
            height={14}
            priority
          />
          <p className="text-sm">즐거운 반려견 케어의 시작</p>
        </div>
        <div className="mt-3 flex cursor-pointer items-center justify-end gap-1">
          <Icon width="12px" height="12px" left="-383px" top="-163px" />
          <p className="text-[10px]">GitHub 바로가기</p>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] sm:text-xs dark:text-[var(--color-black)]">
        ⓒ 2025 ~ Team. All rights reserved.
      </p>
    </footer>
  );
}
