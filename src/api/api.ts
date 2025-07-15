import { AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

interface AuthError {
  code: string;
  message: string;
  status: number;
  timestamp: string;
}

export const register = async (
  name: string,
  nickname: string,
  email: string,
  password: string,
) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/v2/register', {
      name,
      nickname,
      email,
      password,
    });
    return data;
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const sendEmailVerify = async (email: string) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/auth/v1/email-verifications',
      {
        email,
      },
    );
    return { data };
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const checkEmailDuplicated = async (email: string) => {
  try {
    const { data } = await axiosInstance.get('/api/auth/v1/check-email', {
      params: { email },
    });
    return data;
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        const { data } = axiosErr.response;

        throw data;
      }
    }
    throw err;
  }
};

export const checkNicknameDuplicated = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.get('/api/auth/v1/check-nickname', {
      params: { nickname },
    });
    return data;
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        const { data } = axiosErr.response;

        throw data;
      }
    }
    throw err;
  }
};

export const emailVerify = async (email: string, verificationCode: string) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/auth/v1/email-verifications/verify',
      {
        email,
        verificationCode,
      },
    );
    return { data };
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
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
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};

export const logout = async () => {
  try {
    return await axiosInstance.post('/api/v1/auth/logout');
  } catch (err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosErr = err as AxiosError<AuthError>;
      if (axiosErr.response) {
        throw axiosErr.response.data;
      }
    }
    throw err;
  }
};
