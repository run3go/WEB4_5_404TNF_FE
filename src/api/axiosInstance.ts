import axios from 'axios';

//백엔트 끝나면 수정 필요

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let retry = false;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !retry) {
      retry = true;
      try {
        //아직 refresh할 주소 없음, 수정 필요
        const res = await axiosInstance.post('/auth/refresh');

        if (!res.data.accessToken) throw new Error('Access token is missing');
        retry = false;
        localStorage.setItem('accessToken', res.data.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        await axiosInstance.post('/api/auth/v1/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
