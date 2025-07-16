import { axiosInstance } from './axiosInstance';
import { Pet, LifeRecordPayload } from '@/types/diary';

export const getPetsByUserId = async (userId: number): Promise<Pet[]> => {
  const { data } = await axiosInstance.get(`/api/profile/v1/pet/${userId}`);
  return data;
};

export const createLifeRecord = async (body: LifeRecordPayload) => {
  const { data } = await axiosInstance.post('/api/life-record', body);
  return data;
};
