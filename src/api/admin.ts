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
      throw new Error('Failed to load total number of users');
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
      throw new Error('Failed to load transition number');
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
      throw new Error('Failed to load number of articles');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 회원 리스트 조회
export const getUsers = async () => {
  const url = `${baseUrl}/api/admin/v1/admin/users`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load admin table data');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 신고내역 상세
export const getReportDetail = async (reportId: number) => {
  const url = `${baseUrl}/api/admin/v1/reports/${reportId}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load report detail');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};
