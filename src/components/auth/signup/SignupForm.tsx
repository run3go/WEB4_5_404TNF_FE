'use client';

import { register } from '@/api/auth';
import Icon from '@/components/common/Icon';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTermsStore } from '@/stores/termsStore';
import { useMutation } from '@tanstack/react-query';
import EmailInputSection from './EmailInputSection';
import NameInputSection from './NameInputSection';
import NicknameInputSection from './NicknameInputSection';
import PasswordInputSection from './PasswordInputSection';

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

  const signupMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      sessionStorage.removeItem('isAgreeTerms');
      router.push('/login');
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupMutation.isPending) return;
    signupMutation.mutate({
      name: formData.name,
      nickname: formData.nickname,
      email: formData.email,
      password: formData.password,
    });
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
      className="flex flex-col justify-between p-6 pt-[51px] sm:h-[712px] sm:px-[25vw] sm:pt-11"
      onSubmit={handleSignup}
    >
      <div className="flex flex-col gap-4 sm:gap-4">
        <EmailInputSection
          onEmailVerified={(email) => {
            setFormData((prev) => ({ ...prev, email }));
            setIsEmailVerified(true);
          }}
          onEmailChange={() => setIsEmailVerified(false)}
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
          onNicknameChange={() => setIsNicknameChecked(false)}
        />

        <PasswordInputSection
          onPasswordValid={(password) =>
            setFormData((prev) => ({ ...prev, password }))
          }
        />
      </div>

      <button
        className="group mt-10 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] disabled:bg-[#2B2926]/20 sm:mt-5 sm:h-[56px] dark:disabled:bg-[#4f4f4f]"
        disabled={isDisabledSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          {isDisabledSubmit ? (
            <Icon width="20px" height="18px" left="-253px" top="-311px" />
          ) : (
            <Icon
              className="dark:bg-[url('/images/sprite.svg')]"
              width="20px"
              height="18px"
              left="-297px"
              top="-312px"
            />
          )}
          <p className="text-[14px] font-medium text-[#2B2926] group-disabled:text-[#909090] sm:text-[18px]">
            멍멍일지 회원가입
          </p>
        </div>
      </button>
    </form>
  );
}
