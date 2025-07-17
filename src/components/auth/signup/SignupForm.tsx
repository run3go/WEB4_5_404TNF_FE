'use client';

import Icon from '@/components/common/Icon';
import { register } from '@/api/auth';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import NicknameInputSection from './NicknameInputSection';
import EmailInputSection from './EmailInputSection';
import PasswordInputSection from './PasswordInputSection';
import NameInputSection from './NameInputSection';
import { useTermsStore } from '@/stores/termsStore';

export default function SignupForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { setDisagree } = useTermsStore();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  });

  const isDisabledSubmit = !(
    isEmailVerified &&
    isNicknameChecked &&
    Object.values(formData).every((val) => val.trim() !== '')
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        name: formData.name,
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password,
      });
      sessionStorage.removeItem('isAgreeTerms');
      router.push('/login');
    } catch {
      alert('회원가입에 실패했습니다.');
    }
  };

  useEffect(() => {
    return () => {
      if (!window.location.pathname.startsWith('/signup')) {
        setDisagree();
        sessionStorage.removeItem('isAgreeTerms');
      }
    };
  }, [pathname, setDisagree]);

  return (
    <form
      className="flex flex-col justify-between p-6 pt-[51px] sm:h-[712px] sm:px-[21.5vw] sm:pt-11"
      onSubmit={handleSignup}
    >
      <div className="flex flex-col gap-4 sm:gap-4">
        <EmailInputSection
          onEmailVerified={(email) => {
            setFormData((prev) => ({ ...prev, email }));
            setIsEmailVerified(true);
          }}
        />

        <NameInputSection
          value={formData.name}
          onChange={(name) => setFormData((prev) => ({ ...prev, name }))}
        />

        <NicknameInputSection
          onNicknameVerified={(nickname) => {
            setFormData((prev) => ({ ...prev, nickname }));
            setIsNicknameChecked(true);
          }}
        />

        <PasswordInputSection
          onPasswordValid={(password) =>
            setFormData((prev) => ({ ...prev, password }))
          }
        />
      </div>

      <button
        className="group mt-10 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] disabled:bg-[#2B2926]/20 sm:mt-5 sm:h-[56px]"
        disabled={isDisabledSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          {isDisabledSubmit ? (
            <Icon width="20px" height="18px" left="-253px" top="-311px" />
          ) : (
            <Icon width="20px" height="18px" left="-297px" top="-312px" />
          )}
          <p className="text-[14px] font-medium text-[#2B2926] group-disabled:text-[#909090] sm:text-[18px]">
            멍멍일지 회원가입
          </p>
        </div>
      </button>
    </form>
  );
}
