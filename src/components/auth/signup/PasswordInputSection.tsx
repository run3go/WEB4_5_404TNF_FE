'use client';

import { useState } from 'react';
import { validatePassword } from '@/lib/utils/validation';
import PasswordToggleButton from '../ShowPasswordButton';

export default function PasswordInputSection({
  onPasswordValid,
}: {
  onPasswordValid: (password: string) => void;
}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    const passwordError = validatePassword(value);
    const confirmPasswordError =
      touched.confirmPassword && confirmPassword !== value
        ? '비밀번호가 일치하지 않습니다.'
        : '';

    setErrors({
      password: touched.password ? passwordError : '',
      confirmPassword: touched.confirmPassword ? confirmPasswordError : '',
    });

    if (
      !passwordError &&
      !confirmPasswordError &&
      password &&
      confirmPassword
    ) {
      onPasswordValid(password);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    const confirmPasswordError =
      value !== password ? '비밀번호가 일치하지 않습니다.' : '';
    const passwordError = touched.password ? validatePassword(password) : '';

    setErrors({
      password: passwordError,
      confirmPassword: touched.confirmPassword ? confirmPasswordError : '',
    });

    if (!passwordError && !confirmPasswordError) {
      onPasswordValid(password);
    }
  };

  const handleBlur = (field: 'password' | 'confirmPassword') => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === 'password') {
      const passwordError = validatePassword(password);
      const confirmPasswordError =
        touched.confirmPassword && confirmPassword !== password
          ? '비밀번호가 일치하지 않습니다.'
          : '';

      setErrors((prev) => ({
        ...prev,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      }));

      if (
        !passwordError &&
        !confirmPasswordError &&
        password &&
        confirmPassword
      ) {
        onPasswordValid(password);
      }
    } else if (field === 'confirmPassword') {
      const confirmPasswordError =
        confirmPassword !== password ? '비밀번호가 일치하지 않습니다.' : '';
      const passwordError = touched.password ? validatePassword(password) : '';

      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
        password: passwordError,
      }));

      if (!passwordError && !confirmPasswordError) {
        onPasswordValid(password);
      }
    }
  };

  return (
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
          className={`auth__input w-full focus:!border-[#FCC389] ${
            errors.password ? '!border-[var(--color-red)]' : ''
          }`}
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value.trim())}
          onBlur={() => handleBlur('password')}
          autoComplete="new-password"
        />
        {password.length > 0 && (
          <PasswordToggleButton
            isVisible={isShowPassword}
            onClick={() => setIsShowPassword((prev) => !prev)}
          />
        )}
      </div>
      {errors.password && <p className="auth__error">{errors.password}</p>}

      <div className="relative mt-2">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={isShowConfirmPassword ? 'text' : 'password'}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className={`auth__input w-full focus:!border-[#FCC389] ${
            errors.confirmPassword ? '!border-[var(--color-red)]' : ''
          }`}
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value.trim())}
          onBlur={() => handleBlur('confirmPassword')}
          autoComplete="new-password"
        />
        {confirmPassword.length > 0 && (
          <PasswordToggleButton
            isVisible={isShowConfirmPassword}
            onClick={() => setIsShowConfirmPassword((prev) => !prev)}
          />
        )}
      </div>
      {errors.confirmPassword && (
        <p className="auth__error">{errors.confirmPassword}</p>
      )}
    </div>
  );
}
