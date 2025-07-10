import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

interface ErrorResponse {
  code: string;
  message: string;
}

//현재는 회원가입 폼 제출 -> 이메일 인증 -> userId 응답
// 이메일 인증을 뺄 거면 code를 받아오게 수정해야 함, 성공시 code: 'OK'
export const register = async (
  name: string,
  nickname: string,
  email: string,
  password: string,
) => {
  try {
    const { data: userId }: { data: { userId: string } } =
      await axiosInstance.post('/api/auth/v1/register', {
        name,
        nickname,
        email,
        password,
      });
    return userId;
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const emailVerify = async (email: string, verificationCode: string) => {
  try {
    const {
      data: { userId },
    }: { data: { userId: string } } = await axiosInstance.post(
      '/api/auth/v1/register/verify-email',
      {
        email,
        verificationCode,
      },
    );
    return { userId };
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const {
      data: { accessToken },
    }: { data: { accessToken: string } } = await axiosInstance.post(
      '/api/auth/v1/login',
      {
        email,
        password,
      },
    );
    return { accessToken };
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const logout = async () => {
  return await axiosInstance.post('/api/auth/v1/login');
};
