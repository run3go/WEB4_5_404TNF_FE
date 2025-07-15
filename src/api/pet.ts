import { axiosInstance } from './axiosInstance';

export const getPetProfiles = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/profile/v1/pet/${userId}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const registPetProfile = async (payload: PetPayload) => {
  await axiosInstance.post('/api/mypage/v2/pets', payload);
};

export const modifyPetProfile = async (payload: PetPayload, petId: string) => {
  await axiosInstance.put(`/api/mypage/v2/pets/${petId}`, payload);
};

export const deletePetProfile = async (petId: string) => {
  await axiosInstance.delete(`/api/mypage/v2/pets/${petId}`);
};
