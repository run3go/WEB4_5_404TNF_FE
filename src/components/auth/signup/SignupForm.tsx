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
      className="flex flex-col justify-center gap-7 p-6"
      onSubmit={handleSignup}
    >
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-[14px] font-medium text-[#909090]"
        >
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          className="auth__input"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label
            htmlFor="nickname"
            className="text-[14px] font-medium text-[#909090]"
          >
            닉네임
          </label>
          <button
            className="text-[14px] font-medium text-[#FF9526]"
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
          className="auth__input"
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label
            htmlFor="email"
            className="text-[14px] font-medium text-[#909090]"
          >
            이메일
          </label>
          <button
            className="text-[14px] font-medium text-[#FF9526]"
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
          className="auth__input"
          value={formData.email}
          onChange={handleChange}
        />
        {isEmailVerification && (
          <input
            name="verifycationCode"
            type="text"
            placeholder="인증코드를 입력해주세요"
            className="auth__input"
            value={formData.verifycationCode}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="text-[14px] font-medium text-[#909090]"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="영문/숫자/특수문자 혼합 8~20자"
          className="auth__input"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="auth__input"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button className="h-[40px] cursor-pointer rounded-[12px] bg-[#2B2926]/20 py-[10px]">
        <div className="flex items-center justify-center gap-2">
          <Icon width="20px" height="18px" left="-253px" top="-311px" />
          <p className="text-[14px] font-medium text-[#909090]">
            멍멍일지 회원가입
          </p>
        </div>
      </button>
    </form>
  );
}
