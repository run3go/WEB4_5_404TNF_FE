import { axiosInstance } from './axiosInstance';

export const getPetsByUserId = async (userId: number): Promise<DiaryPet[]> => {
  const { data } = await axiosInstance.get(`/api/profile/v1/pet/${userId}`);
  return data;
};

export const createLifeRecord = async (body: LifeRecordPayload) => {
  const { data } = await axiosInstance.post('/api/life-record', body);
  return data;
};
