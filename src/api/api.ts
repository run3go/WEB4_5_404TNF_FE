import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

// 백엔드 끝나면 수정 필요

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
