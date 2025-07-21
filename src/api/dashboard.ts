import { formatDate } from 'date-fns';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const today = formatDate(new Date(), 'yyyy-MM-dd');
const queryString = new URLSearchParams({ date: today }).toString();

export const getPetList = async (userId: string) => {
  const res = await fetch(`${baseURL}/api/profile/v1/users/${userId}/pet`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '반려견 목록 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const getDashboardProfile = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/dog-profile?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 프로필 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const getDashboardWeight = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/weight?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 몸무게 조회 실패');
  }

  const data = await res.json();
  return data.weightList;
};

export const getDashboardSleep = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/sleeping?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 수면시간 조회 실패');
  }

  const data = await res.json();
  return data.sleepingList;
};

export const getDashboardNote = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/note?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 노트 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const getDashboardRecommend = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/recommend?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 맞춤형 데이터 조회 실패');
  }

  const data = await res.json();
  return data.recommend;
};

export const getDashboardFeeding = async (petId: number) => {
  const res = await fetch(
    `${baseURL}/api/dashboard/${petId}/feeding?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '대시보드 식사량 조회 실패');
  }

  const data = await res.json();
  return data;
};
