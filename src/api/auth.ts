export const login = async (email: string, password: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/v1/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  return data;
};

export const logout = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/v1/logout`,
    {
      method: 'POST',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  return data;
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/v1/${userId}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};
