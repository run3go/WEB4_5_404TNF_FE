'use client';

import { emailVerify, register } from '@/api/api';
import Icon from '@/components/common/Icon';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const router = useRouter();
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    verifycationCode: '',
  });

  const sendEmailVerificationMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
      nickname,
    }: {
      email: string;
      password: string;
      name: string;
      nickname: string;
    }) => await register(name, nickname, email, password),
    onSuccess: () => {
      alert('회원가입 인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
      setIsEmailVerification(true);
    },
    onError(err) {
      if (err) {
        alert('회원가입에 실패했습니다.');
      }
    },
  });

  const singupMutation = useMutation({
    mutationFn: async ({
      email,
      verifycationCode,
    }: {
      email: string;
      verifycationCode: string;
    }) => await emailVerify(email, verifycationCode),
    onSuccess: (response) => {
      if (response) {
        alert('회원가입 성공.');
        router.push('/login');
      }
    },
    onError(err) {
      if (err) {
        alert('회원가입에 실패했습니다.');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    singupMutation.mutate({
      email: formData.email,
      verifycationCode: formData.verifycationCode,
    });
    console.log(formData);
  };

  return (
    <form
      className="flex w-full flex-col justify-center gap-7 p-6 sm:gap-8 sm:px-[21.5vw] sm:pt-13"
      onSubmit={handleSignup}
    >
      <div className="flex flex-col">
        <div className="flex max-w-[720px] justify-between">
          <label
            htmlFor="email"
            className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
          >
            이메일
          </label>
          <button
            className="cursor-pointer text-[14px] font-medium text-[#FF9526] sm:text-[15px]"
            type="button"
            onClick={() => {
              sendEmailVerificationMutation.mutate({
                name: formData.name,
                nickname: formData.nickname,
                email: formData.email,
                password: formData.password,
              });
            }}
          >
            이메일 인증
          </button>
        </div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@example.com"
          className="auth__input focus:!border-[#FCC389]"
          value={formData.email}
          onChange={handleChange}
        />
        {!isEmailVerification && (
          <div className="flex w-full items-center gap-4">
            <input
              name="verifycationCode"
              type="text"
              placeholder="인증코드를 입력해주세요"
              className="auth__input w-full focus:!border-[#FCC389]"
              value={formData.verifycationCode}
              onChange={handleChange}
            />
            <p className="mt-[13px] shrink-0 text-[#ED4848]">3: 00</p>
            <button className="mt-[13px] flex h-[40px] w-[86px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#FFDBAB] px-7 py-4 text-[14px] sm:h-[52px]">
              확인
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
        >
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex max-w-[720px] justify-between">
          <label
            htmlFor="nickname"
            className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
          >
            닉네임
          </label>
          <button
            className="cursor-pointer text-[14px] font-medium text-[#FF9526] sm:text-[15px]"
            type="button"
          >
            중복확인
          </button>
        </div>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="영문/숫자/특수문자 혼합 8~20자"
          className="auth__input focus:!border-[#FCC389]"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button
        className="h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] disabled:bg-[#2B2926]/20 sm:h-[56px]"
        disabled
      >
        <div className="flex items-center justify-center gap-2">
          <Icon width="20px" height="18px" left="-253px" top="-311px" />
          <p className="text-[14px] font-medium text-[#909090] sm:text-[18px]">
            멍멍일지 회원가입
          </p>
        </div>
      </button>
    </form>
  );
}
