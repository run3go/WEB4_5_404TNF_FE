import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://mungdiary-172598302113.asia-northeast3.run.app',
  withCredentials: true,
});
