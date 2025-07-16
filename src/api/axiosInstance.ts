import axios from 'axios';

//백엔트 끝나면 수정 필요

export const axiosInstance = axios.create({
  baseURL: 'https://mungdiary-172598302113.asia-northeast3.run.app',
  withCredentials: true,
});
