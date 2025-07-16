import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

interface ErrorResponse {
  status: number;
  statusText: string;
  // data 타입 수정 필요
  data: string;
}

export const register = async (
  name: string,
  nickname: string,
  email: string,
  password: string,
) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/v1/register', {
      name,
      nickname,
      email,
      password,
    });
    return data;
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
  return await axiosInstance.post('/api/auth/v1/logout');
};
