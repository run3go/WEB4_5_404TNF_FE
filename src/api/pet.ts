import { axiosInstance } from './axiosInstance';

export const getPetProfiles = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/profile/v1/pet/${userId}`);
  return data;
};

export const registPetProfile = async (payload: PetPayload) => {
  await axiosInstance.post(`/api/mypage/v2/pets`, payload);
};

export const modifyPetProfile = async (payload: PetPayload, petId: string) => {
  await axiosInstance.put(`/api/mypage/v2/pets/${petId}`, payload);
};

export const deletePetProfile = async (petId: string) => {
  await axiosInstance.delete(`/api/mypage/v2/pets/${petId}`);
};
