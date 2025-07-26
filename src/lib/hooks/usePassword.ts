import { checkPassword } from '@/api/user';
import { useState } from 'react';
import { validatePassword } from '../utils/validation';

export const usePassword = (onPasswordValid: (password: string) => void) => {
  const [currentPwd, setCurrentPwd] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const checkCurrentPassword = async () => {
    try {
      const payload = { password: currentPwd };
      const isMatched = await checkPassword(payload);
      setIsMatched(isMatched);
      alert(
        isMatched ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다',
      );
    } catch (err) {
      console.log(err);
    }
  };

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
  const isConfirmMatched = password === confirmPassword;
  return {
    password,
    confirmPassword,
    errors,
    currentPwd,
    isMatched,
    isConfirmMatched,
    setCurrentPwd,
    checkCurrentPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleBlur,
  };
};
