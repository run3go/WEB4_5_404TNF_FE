'use client';

import {
  validateEmail,
  validateName,
  validateNickname,
  validatePassword,
} from '@/lib/utils/validation';
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  sendEmailVerification,
  verifyEmailCode,
  register,
} from '@/api/auth';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import PasswordToggleButton from '../ShowPasswordButton';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false);
  const [emailState, setEmailState] = useState({
    checkedEmail: '',
    duplicateError: '',
    verificationError: '',
    isEmailVerified: false,
  });

  const [nicknameState, setNicknameState] = useState({
    checkedNickname: '',
    duplicateError: '',
    isNicknameChecked: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    nickname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSendEmailVerify = async (email: string) => {
    try {
      if (email.length === 0) {
        setErrors((prev) => ({
          ...prev,
          email: '이메일을 입력해주세요.',
        }));
        return;
      }
      if (errors.email) {
        return;
      }
      await checkEmailDuplicate(email);
      await sendEmailVerification(email);
      setFormData((prev) => ({
        ...prev,
        verificationCode: '',
      }));
      setEmailState((prev) => ({
        ...prev,
        duplicateError: '',
        checkedEmail: '',
      }));
      setIsEmailVerification(true);
    } catch (err) {
      console.error(err);
      setEmailState((prev) => ({
        ...prev,
        duplicateError: '이미 사용 중인 이메일입니다.',
      }));
    }
  };

  const handleVerifyCode = async (email: string, verificationCode: string) => {
    try {
      await verifyEmailCode(email, verificationCode);
      setEmailState((prev) => ({
        ...prev,
        isEmailVerified: true,
        checkedEmail: email,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckNickname = async () => {
    try {
      await checkNicknameDuplicate(formData.nickname);
      setNicknameState((prev) => ({
        ...prev,
        isNicknameChecked: true,
        duplicateError: '',
        checkedNickname: formData.nickname,
      }));
    } catch {
      setNicknameState((prev) => ({
        ...prev,
        duplicateError: '이미 사용 중인 닉네임입니다.',
      }));
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        name: formData.name,
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password,
      });
      router.push('/login');
    } catch {
      alert('회원가입에 실패했습니다.');
    }
  };

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
      case 'verificationCode':
        return value ? '' : '인증 코드를 입력해주세요.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailState((prev) => ({ ...prev, isEmailVerified: false }));
    }

    if (name === 'nickname') {
      setNicknameState((prev) => ({ ...prev, isNicknameChecked: false }));
    }

    setFormData((prev) => ({ ...prev, [name]: value.trim() }));

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
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      alert('입력 내용을 확인해주세요.');
      return;
    }
    await handleRegister();
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
              onClick={() => handleSendEmailVerify(formData.email)}
            >
              이메일 인증
            </button>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            className={`auth__input focus:!border-[#FCC389] ${touched.email && errors.email ? '!border-[var(--color-red)]' : ''}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="auth__error">{errors.email}</p>
          )}
          {emailState.duplicateError && (
            <p className="auth__error">{emailState.duplicateError}</p>
          )}
          {isEmailVerification && (
            <>
              <div className="flex w-full items-center gap-4">
                <input
                  name="verificationCode"
                  type="text"
                  placeholder="인증코드를 입력해주세요"
                  className="auth__input w-full focus:!border-[#FCC389]"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="mt-[13px] shrink-0 text-[#ED4848]">3: 00</p>
                <button
                  type="button"
                  className="mt-[13px] flex h-[40px] w-[86px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#FFDBAB] px-7 py-4 text-[14px] disabled:bg-[#2B2926]/20 sm:h-[52px]"
                  onClick={() => {
                    handleVerifyCode(formData.email, formData.verificationCode);
                  }}
                  disabled={!formData.verificationCode.trim()}
                >
                  확인
                </button>
              </div>
              {emailState.checkedEmail === formData.email &&
                emailState.checkedEmail !== '' && (
                  <p className="auth__success">이메일 인증이 완료되었습니다.</p>
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
            className={`auth__input focus:!border-[#FCC389] ${touched.name && errors.name ? '!border-[var(--color-red)]' : ''}`}
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
              onClick={handleCheckNickname}
            >
              중복확인
            </button>
          </div>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            className={`auth__input focus:!border-[#FCC389] ${touched.nickname && errors.nickname ? '!border-[var(--color-red)]' : ''}`}
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nickname && errors.nickname && (
            <p className="auth__error">{errors.nickname}</p>
          )}
          {nicknameState.duplicateError && (
            <p className="auth__error">{nicknameState.duplicateError}</p>
          )}
          {nicknameState.checkedNickname === formData.nickname &&
            nicknameState.checkedNickname !== '' && (
              <p className="auth__success">사용가능한 닉네임입니다.</p>
            )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="영문/숫자/특수문자 혼합 8~20자"
              className={`auth__input w-full focus:!border-[#FCC389] ${touched.password && errors.password ? '!border-[var(--color-red)]' : ''}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formData.password.length > 0 && (
              <PasswordToggleButton
                isVisible={isShowPassword}
                onClick={() => setIsShowPassword((prev) => !prev)}
              />
            )}
          </div>
          {touched.password && errors.password && (
            <p className="auth__error">{errors.password}</p>
          )}

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={isShowComfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className={`auth__input w-full focus:!border-[#FCC389] ${touched.confirmPassword && errors.confirmPassword ? '!border-[var(--color-red)]' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formData.confirmPassword.length > 0 && (
              <PasswordToggleButton
                isVisible={isShowComfirmPassword}
                onClick={() => setIsShowComfirmPassword((prev) => !prev)}
              />
            )}
            <button
              type="button"
              onClick={() => setIsShowComfirmPassword((show) => !show)}
              className="absolute top-[38px] right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-300"
            >
              <Icon
                width="16px"
                height="14px"
                left="-361px"
                top="-378px"
                className="scale-75 sm:scale-100"
              />
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="auth__error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <button
        className="mt-10 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] disabled:bg-[#2B2926]/20 sm:mt-5 sm:h-[56px]"
        disabled={
          !(
            emailState.checkedEmail === formData.email &&
            nicknameState.checkedNickname === formData.nickname &&
            !Object.values(errors).some((error) => error !== '') &&
            Object.values(formData).every((val) => val.trim() !== '')
          )
        }
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
