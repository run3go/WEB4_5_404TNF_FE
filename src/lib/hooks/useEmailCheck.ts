import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  checkEmailDuplicate,
  sendEmailVerification,
  verifyEmailCode,
} from '@/api/auth';

export const useEmailCheck = () => {
  const [emailState, setEmailState] = useState({
    duplicateError: '',
    verificationError: '',
    isEmailVerified: false,
  });

  const checkDuplicateMutation = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: () => {
      setEmailState((prev) => ({
        ...prev,
        duplicateError: '',
      }));
    },
    onError: (error: Error) => {
      setEmailState((prev) => ({
        ...prev,
        duplicateError:
          error.message || '이메일 중복 확인 중 오류가 발생했습니다.',
      }));
    },
  });

  const sendVerificationCodeMutation = useMutation({
    mutationFn: sendEmailVerification,
    onError: (error: Error) => {
      setEmailState((prev) => ({
        ...prev,
        verificationError:
          error.message || '인증코드 전송 중 오류가 발생했습니다.',
      }));
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCode(email, code),
    onSuccess: () => {
      setEmailState((prev) => ({
        ...prev,
        isEmailVerified: true,
        verificationError: '',
      }));
    },
    onError: (error: Error) => {
      const message =
        error.message === '이메일 인증에 실패하였습니다.'
          ? '이메일 인증코드가 일치하지 않습니다.'
          : error.message || '이메일 인증코드 확인 중 오류가 발생했습니다.';

      setEmailState((prev) => ({
        ...prev,
        verificationError: message,
      }));
    },
  });

  const resetEmailState = () => {
    setEmailState({
      duplicateError: '',
      verificationError: '',
      isEmailVerified: false,
    });
  };

  const resetVerificationError = () => {
    setEmailState((prev) => ({
      ...prev,
      verificationError: '',
    }));
  };

  return {
    emailState,
    checkDuplicateMutation,
    sendVerificationCodeMutation,
    verifyCodeMutation,
    resetEmailState,
    resetVerificationError,
  };
};
