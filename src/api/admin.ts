const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// 전체 가입자 수 조회
export const getTotalUsers = async () => {
  const url = `${baseUrl}/api/admin/v1/stats/users`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load schedule');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 가입/탈퇴자 수 조회
export const getTransition = async (unit: string) => {
  const url = `${baseUrl}/api/admin/v1/stats/transition?unit=${unit}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load schedule');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 게시글 수 조회
export const getArticles = async (unit: string) => {
  const url = `${baseUrl}/api/admin/v1/stats/articles?unit=${unit}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load schedule');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};
