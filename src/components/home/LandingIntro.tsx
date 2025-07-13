import mainImage from '@/assets/images/landing-main.png';
import Image from 'next/image';

export default function LandingIntro() {
  return (
    <>
      <section className="h-auto w-full bg-[#ffd091] px-4 pt-4 sm:px-20 sm:pt-20">
        <div className="flex flex-col gap-9 pt-6 pb-7 sm:pt-14 sm:pb-[158px]">
          <h2 className="text-center text-xl font-bold sm:text-5xl">
            매일의 기록이 모여,
            <br />내 강아지를 더 잘 알게 돼요
          </h2>

          <p className="hidden text-center text-2xl sm:block">
            <span className="font-bold text-[var(--color-primary-500)]">
              멍멍일지
            </span>
            가 내 강아지에게 딱 맞는 정보를 알려드립니다
          </p>
          <p className="block text-center text-sm sm:hidden">
            <span className="font-bold text-[var(--color-primary-500)]">
              멍멍일지
            </span>
            가 내 강아지에게 <br />딱 맞는 정보를 알려드립니다
          </p>
        </div>
        <Image
          className="h-auto w-full"
          src={mainImage}
          alt="메인"
          priority
        ></Image>
      </section>
    </>
  );
}
