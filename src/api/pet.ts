import { axiosInstance } from './axiosInstance';

//반려견 정보 작업 후 tanstack query로 변경

export const getPetProfiles = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/profile/v1/pet/${userId}`);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getPetProfile = async (petId: number) => {
  const { data } = await axiosInstance.get(`/api/mypage/v1/pets/${petId}`);
  return data;
};

export const registPetProfile = async (payload: PetPayload) => {
  await axiosInstance.post('/api/mypage/v2/pets', payload);
};

export const modifyPetProfile = async (payload: PetPayload, petId: number) => {
  await axiosInstance.put(`/api/mypage/v2/pets/${petId}`, payload);
};

export const deletePetProfile = async (petId: number) => {
  await axiosInstance.delete(`/api/mypage/v2/pets/${petId}`);
};
