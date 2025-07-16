const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPetProfiles = async (userId: string): Promise<PetProfile[]> => {
  const res = await fetch(`${baseURL}/api/profile/v1/pet/${userId}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const getPetProfile = async (petId: number) => {
  const res = await fetch(`${baseURL}/api/mypage/v1/pets/${petId}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const registPetProfile = async (payload: PetPayload) => {
  const res = await fetch(`${baseURL}/api/mypage/v2/pets`, {
    method: 'post',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 등록 실패');
  }
};

export const modifyPetProfile = async (payload: PetPayload, petId: number) => {
  const res = await fetch(`${baseURL}/api/mypage/v2/pets/${petId}`, {
    method: 'put',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 수정 실패');
  }
};

export const deletePetProfile = async (petId: number) => {
  const res = await fetch(`${baseURL}/api/mypage/v2/pets/${petId}`, {
    method: 'delete',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 삭제 실패');
  }
};
