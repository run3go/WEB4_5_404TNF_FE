const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMyUserInfo = async () => {
  const res = await fetch(`${baseURL}/api/mypage/v1/me`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '내 유저 정보 조회 실패');
  }

  const data = await res.json();
  return data;
};

export const checkPassword = async (password: { password: string }) => {
  const res = await fetch(`${baseURL}/api/mypage/v1/me/password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(password),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '현재 비밀번호 일치 확인 실패');
  }

  const data = await res.json();
  return data;
};

export const modifyUserInfo = async (payload: UserInfo) => {
  const formdata = new FormData();
  const requestPayload = {
    nickname: payload.nickname,
  };
  formdata.append('request', JSON.stringify(requestPayload));
  if (payload.image) {
    formdata.append('image', payload.image);
  }
  const res = await fetch(`${baseURL}/api/mypage/v1/me`, {
    method: 'PATCH',
    body: formdata,
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '내 유저 정보 수정 실패');
  }

  const data = await res.json();
  return data;
};

export const resignAccount = async (userId: string) => {
  const res = await fetch(`${baseURL}/api/mypage/v1/me/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userId),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '회원 탈퇴 실패');
  }
};
