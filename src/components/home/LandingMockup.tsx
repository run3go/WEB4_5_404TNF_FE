'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import pc from '@/assets/images/landing-pc.svg';
import phone from '@/assets/images/landing-phone.svg';
import Icon from '../common/Icon';

export default function LandingMockup() {
  return (
    <section className="h-auto bg-[var(--color-background)] px-5 py-10 sm:px-20 sm:py-20 dark:bg-[var(--color-black)]">
      <motion.div
        className="flex flex-col items-end gap-3 pb-20 sm:gap-9 sm:pb-40"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-bold sm:text-3xl">
          웹과 모바일 모두에 최적화된{' '}
          <span className="text-[var(--color-primary-500)]">멍멍일지</span>
        </h2>
        <p className="text-end text-sm sm:text-2xl">
          넓은 화면에서도, 손안에서도
          <br />내 강아지의 하루를 기록할 수 있어요
        </p>
      </motion.div>

      <div className="flex items-end justify-center gap-5 pb-32 sm:mx-[100px] sm:gap-14 sm:pb-72">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Image
            className="h-auto w-[700px] max-w-full"
            src={pc}
            alt="pc목업"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <Image
            className="h-auto w-[180px] max-w-full"
            src={phone}
            alt="휴대폰목업"
            priority
          />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Icon
          className="hidden sm:block"
          width="30px"
          height="26px"
          left="-373px"
          top="-115px"
        />
        <Icon
          className="block sm:hidden"
          width="16px"
          height="14px"
          left="-340px"
          top="-122px"
        />
        <p className="text-center text-sm sm:text-xl">
          <span className="font-bold text-[var(--color-primary-500)]">
            멍멍일지
          </span>
          와 함께하는 <br />
          즐거운{' '}
          <span className="font-bold text-[var(--color-primary-500)]">
            반려생활
          </span>
        </p>
      </div>
    </section>
  );
}
