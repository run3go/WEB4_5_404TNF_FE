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

export const modifyUserInfo = async (payload: ProfileInfo) => {
  const formdata = new FormData();
  const requestPayload = {
    nickname: payload.nickname,
    password: payload.password,
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

export const resignAccount = async () => {
  const res = await fetch(`${baseURL}/api/mypage/v1/me`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '회원 탈퇴 실패');
  }
};

export const getMyPosts = async (type: PostType, payload: PostPaylaod) => {
  const queryString = new URLSearchParams(payload).toString();
  const res = await fetch(
    `${baseURL}/api/mypage/v1/board/${type}?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '내 게시글 조회 실패');
  }
  const data = await res.json();
  return data;
};

export const getUserPosts = async (userId: string, payload: PostPaylaod) => {
  const queryString = new URLSearchParams(payload).toString();
  const res = await fetch(
    `${baseURL}/api/profile/v1/users/${userId}/board?${queryString}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '유저 게시글 조회 실패');
  }
  const data = await res.json();
  return data;
};
