import { useState } from 'react';
import {
  checkEmailDuplicate,
  sendEmailVerification,
  verifyEmailCode,
} from '@/api/auth';

export const useEmailCheck = () => {
  const [emailState, setEmailState] = useState({
    checkedEmail: '',
    duplicateError: '',
    verificationError: '',
    isEmailVerified: false,
  });

  const resetVerificationError = () => {
    setEmailState((prev) => ({ ...prev, verificationError: '' }));
  };

  const checkDuplicate = async (email: string) => {
    try {
      await checkEmailDuplicate(email);
      setEmailState((prev) => ({
        ...prev,
        duplicateError: '',
      }));
      return true;
    } catch (err) {
      setEmailState((prev) => ({
        ...prev,
        duplicateError:
          err instanceof Error
            ? err.message
            : '이메일 중복 확인 중 오류가 발생했습니다.',
      }));
      return false;
    }
  };

  const sendVerificationCode = async (email: string) => {
    try {
      await sendEmailVerification(email);
      return true;
    } catch (err) {
      setEmailState((prev) => ({
        ...prev,
        verificationError:
          err instanceof Error
            ? err.message
            : '인증코드 전송 중 오류가 발생했습니다.',
      }));
      return false;
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      await verifyEmailCode(email, code);
      setEmailState((prev) => ({
        ...prev,
        isEmailVerified: true,
        checkedEmail: email,
      }));
      return true;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : '이메일 인증코드 확인 중 오류가 발생했습니다.';
      setEmailState((prev) => ({
        ...prev,
        verificationError:
          message === '이메일 인증에 실패하였습니다.'
            ? '이메일 인증코드가 일치하지 않습니다.'
            : message,
      }));
      return false;
    }
  };

  const resetEmailState = () => {
    setEmailState({
      checkedEmail: '',
      duplicateError: '',
      verificationError: '',
      isEmailVerified: false,
    });
  };

  return {
    emailState,
    checkDuplicate,
    sendVerificationCode,
    verifyCode,
    resetEmailState,
    resetVerificationError,
  };
};
