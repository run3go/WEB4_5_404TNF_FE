import { axiosInstance } from './axiosInstance';

export const getUserProfile = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/profile/v1/${userId}`);
  return data;
};
