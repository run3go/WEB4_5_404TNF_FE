'use client';

import Icon from '@/components/common/Icon';
import { useTermsStore } from '@/stores/termsStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TermsAgreement() {
  const router = useRouter();
  const setAgree = useTermsStore((state) => state.setAgree);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleChange = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAgree = () => {
    setAgree();
    sessionStorage.setItem('isAgreeTerms', 'true');
    router.push('/signup');
  };

  const isNextEnabled = agreements.terms && agreements.privacy;

  return (
    <>
      <div className="mt-[1.4vh] ml-9 flex flex-col gap-[9px] sm:mt-6 sm:ml-[19.5vw]">
        <label className="flex h-[20px] w-fit cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="peer hidden"
            onChange={() => handleChange('terms')}
          />
          <Icon
            width="19px"
            height="19px"
            left="-286px"
            top="-380px"
            className="scale-95 peer-checked:hidden sm:scale-100"
          />
          <Icon
            width="19px"
            height="19px"
            left="-246px"
            top="-380px"
            className="hidden scale-95 peer-checked:block sm:scale-100"
          />
          <p className="text-[12px] font-medium sm:text-[16px]">
            [필수] 위 약관에 동의합니다.
          </p>
        </label>
        <label className="flex h-[20px] w-fit cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="peer hidden"
            onChange={() => handleChange('privacy')}
          />
          <Icon
            width="19px"
            height="19px"
            left="-286px"
            top="-380px"
            className="scale-95 peer-checked:hidden"
          />
          <Icon
            width="19px"
            height="19px"
            left="-246px"
            top="-380px"
            className="hidden scale-95 peer-checked:block"
          />
          <p className="text-[12px] font-medium sm:text-[16px]">
            [필수] 개인정보 수집 및 이용에 동의합니다.
          </p>
        </label>
        <label className="flex h-[20px] w-fit cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="peer hidden"
            onChange={() => handleChange('marketing')}
          />
          <Icon
            width="19px"
            height="19px"
            left="-286px"
            top="-380px"
            className="scale-95 peer-checked:hidden"
          />
          <Icon
            width="19px"
            height="19px"
            left="-246px"
            top="-380px"
            className="hidden scale-95 peer-checked:block"
          />
          <p className="text-[12px] font-medium sm:text-[16px]">
            [선택] 광고성 정보 수신에 동의합니다.
          </p>
        </label>
      </div>

      <div className="mx-6 sm:mx-[19.5vw]">
        <button
          className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[var(--color-primary-200)] text-[14px] hover:bg-[var(--color-primary-300)] disabled:bg-[#2B2926]/20 disabled:text-[#909090] sm:mt-14 sm:h-[56px] sm:text-[18px] dark:text-[var(--color-black)] dark:disabled:bg-[#4f4f4f]"
          onClick={handleAgree}
          disabled={!isNextEnabled}
        >
          다음 단계로
        </button>
      </div>
    </>
  );
}
