import { Toast } from '@/components/common/Toast';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPetProfiles = async (userId: string): Promise<PetProfile[]> => {
  const res = await fetch(`${baseURL}/api/profile/v1/users/${userId}/pet`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const getPetProfile = async (petId: number) => {
  const res = await fetch(`${baseURL}/api/mypage/v1/pets/${petId}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 조회 실패');
  }
  const data = await res.json();
  return data;
};

export const registPetProfile = async (
  payload: PetPayload,
  image: File | null,
) => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024;
  if (image && image.size > MAX_FILE_SIZE) {
    Toast.error('이미지 파일은 3MB 이하만 업로드할 수 있습니다.');
    return;
  }
  const formdata = new FormData();
  formdata.append('request', JSON.stringify(payload));
  if (image) {
    formdata.append('image', image);
  }
  const res = await fetch(`${baseURL}/api/mypage/v3/pets`, {
    method: 'post',
    body: formdata,
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 등록 실패');
  }
};

export const modifyPetProfile = async (
  payload: PetPayload,
  image: File | null,
  petId: number,
) => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024;
  if (image && image.size > MAX_FILE_SIZE) {
    Toast.error('이미지 파일은 3MB 이하만 업로드할 수 있습니다.');
    return;
  }
  const formdata = new FormData();
  formdata.append('request', JSON.stringify(payload));
  if (image) {
    formdata.append('image', image);
  }
  const res = await fetch(`${baseURL}/api/mypage/v3/pets/${petId}`, {
    method: 'put',
    body: formdata,
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 수정 실패');
  }
};

export const deletePetProfile = async (petId: number) => {
  const res = await fetch(`${baseURL}/api/mypage/v2/pets/${petId}`, {
    method: 'delete',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려 동물 정보 삭제 실패');
  }
};

export const getVaccineData = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/mypage/v1/pets/${petId}/vaccination`,
    {
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '백신 정보 조회 실패');
  }
  const data = await res.json();
  return data;
};

export const modifyVaccineData = async (
  payload: VaccinePayload[],
  petId: number,
) => {
  const res = await fetch(
    `${baseURL}/api/mypage/v1/pets/${petId}/vaccination`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '백신 정보 저장 실패');
  }
};

export const getVaccineSchedule = async (petId: number) => {
  const res = await fetch(`${baseURL}/api/schedule/v2/vaccination/${petId}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '백신 일정 조회 실패');
  }
  const data = await res.json();
  return data.data;
}
export const createVaccineSchedule = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/mypage/v1/pets/${petId}/vaccination-schedule`,
    {
      method: 'post',
      credentials: 'include',
    },
  );
  console.log(res);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '백신 일정 생성 실패');
  }
};
