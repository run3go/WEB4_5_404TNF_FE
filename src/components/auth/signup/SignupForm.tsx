'use client';

import { emailVerify, register } from '@/api/api';
import Icon from '@/components/common/Icon';
import {
  validateEmail,
  validateName,
  validateNickname,
  validatePassword,
  validateVerificationCode,
} from '@/lib/utils/validation';
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

  const [errors, setErrors] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    verifycationCode: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    nickname: false,
    email: false,
    password: false,
    confirmPassword: false,
    verifycationCode: false,
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

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'nickname':
        return validateNickname(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return value !== formData.password
          ? '비밀번호가 일치하지 않습니다.'
          : '';
      case 'name':
        return validateName(value);
      case 'verifycationCode':
        return value ? '' : '인증 코드를 입력해주세요.';
      default:
        return '';
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: typeof errors = {
      name: validateName(formData.name),
      nickname: validateNickname(formData.nickname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.confirmPassword !== formData.password
          ? '비밀번호가 일치하지 않습니다.'
          : '',
      verifycationCode: validateVerificationCode(formData.verifycationCode),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== '');
  };
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      alert('입력 내용을 확인해주세요.');
      return;
    }
    singupMutation.mutate({
      email: formData.email,
      verifycationCode: formData.verifycationCode,
    });
    console.log(formData);
  };

  return (
    <form
      className="flex flex-col justify-between p-6 pt-[51px] sm:h-[712px] sm:px-[21.5vw] sm:pt-11"
      onSubmit={handleSignup}
    >
      <div className="flex flex-col gap-7 sm:gap-7">
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
            className={`auth__input focus:!border-[#FCC389] ${
              touched.email && errors.email ? '!border-[var(--color-red)]' : ''
            }`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="auth__error">{errors.email}</p>
          )}
          {!isEmailVerification && (
            <>
              <div className="flex w-full items-center gap-4">
                <input
                  name="verifycationCode"
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  className={`auth__input w-full focus:!border-[#FCC389] ${
                    touched.verifycationCode && errors.verifycationCode
                      ? '!border-[var(--color-red)]'
                      : ''
                  }`}
                  value={formData.verifycationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="mt-[13px] shrink-0 text-[#ED4848]">3: 00</p>
                <button className="mt-[13px] flex h-[40px] w-[86px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#FFDBAB] px-7 py-4 text-[14px] sm:h-[52px]">
                  확인
                </button>
              </div>
              {touched.verifycationCode && errors.verifycationCode && (
                <p className="auth__error">{errors.verifycationCode}</p>
              )}
            </>
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
            className={`auth__input focus:!border-[#FCC389] ${
              touched.name && errors.name ? '!border-[var(--color-red)]' : ''
            }`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <p className="auth__error">{errors.name}</p>
          )}
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
            className={`auth__input focus:!border-[#FCC389] ${
              touched.nickname && errors.nickname
                ? '!border-[var(--color-red)]'
                : ''
            }`}
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nickname && errors.nickname && (
            <p className="auth__error">{errors.nickname}</p>
          )}
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
            className={`auth__input focus:!border-[#FCC389] ${
              touched.password && errors.password
                ? '!border-[var(--color-red)]'
                : ''
            }`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className="auth__error">{errors.password}</p>
          )}
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            className={`auth__input focus:!border-[#FCC389] ${
              touched.confirmPassword && errors.confirmPassword
                ? '!border-[var(--color-red)]'
                : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="auth__error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button
        className="mt-10 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] disabled:bg-[#2B2926]/20 sm:mt-5 sm:h-[56px]"
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
