import {
  checkEmailDuplicated,
  checkNicknameDuplicated,
  emailVerify,
  register,
  sendEmailVerify,
} from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCheckEmailDuplicate = (onErrorCallback: () => void) => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await checkEmailDuplicated(email),
    onError: () => {
      alert('중복된 이메일입니다.');
      onErrorCallback();
    },
  });
};
export const useCheckNicknameDuplicate = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: async ({ nickname }: { nickname: string }) =>
      await checkNicknameDuplicated(nickname),
    onSuccess: (res) => {
      if (res) {
        alert('닉네임 사용 가능');
        onSuccessCallback();
      }
    },
    onError: () => {
      alert('중복된 닉네임입니다.');
    },
  });
};
export const useSendEmailVerification = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await sendEmailVerify(email),
    onSuccess: () => {
      alert('인증 이메일이 발송되었습니다.');
      onSuccessCallback();
    },
    onError: () => {
      alert('이메일 전송 실패');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      name,
      nickname,
      email,
      password,
    }: {
      name: string;
      nickname: string;
      email: string;
      password: string;
    }) => await register(name, nickname, email, password),

    onSuccess: (response) => {
      if (response) {
        alert('회원가입 성공.');
        router.push('/login');
      }
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });
};

export const useEmailVerification = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: async ({
      email,
      verificationCode,
    }: {
      email: string;
      verificationCode: string;
    }) => await emailVerify(email, verificationCode),

    onSuccess: (response) => {
      if (response) {
        alert('이메일 인증 성공.');
        onSuccessCallback();
      }
    },
    onError: () => {
      alert('이메일 인증 실패.');
    },
  });
};
