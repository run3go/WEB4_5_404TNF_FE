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

// 신고내역 처리(accept)
export const acceptReport = async (acceptInfo: AcceptInfo) => {
  const url = `${baseUrl}/api/admin/v1/reports/result-accept`;

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportId: acceptInfo.reportId,
        period: acceptInfo.period,
        adminReason: acceptInfo.adminReason,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to accept report');
    }
    const data = res;
    return data;
  } catch (err) {
    console.log(err);
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 신고내역 처리(reject)
export const rejectReport = async (rejectInfo: RejectInfo) => {
  const url = `${baseUrl}/api/admin/v1/reports/result-reject`;

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportId: rejectInfo.reportId,
        adminReason: rejectInfo.adminReason,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to reject report');
    }
    const data = res;
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 회원 목록 조회
export const getUserList = async (getUserListInfo: GetListInfo) => {
  const url = `${baseUrl}/api/admin/v1/users?page=${getUserListInfo.page}&size=10&search=${getUserListInfo.search}&sort=${getUserListInfo.sort}&sortBy=${getUserListInfo.sortBy}&status=${getUserListInfo.status}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load users');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 신고 목록 조회
export const getReportList = async (getReportListInfo: GetListInfo) => {
  const url = `${baseUrl}/api/admin/v1/reports?page=${getReportListInfo.page}&size=10&search=${getReportListInfo.search}&sort=${getReportListInfo.sort}&sortBy=${getReportListInfo.sortBy}&status=${getReportListInfo.status}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to load reports');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};

// 유저 상태 변경(정지 -> 활성)
export const changeUserState = async (userId: number) => {
  const url = `${baseUrl}/api/admin/v1/users/${userId}/state`;

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to reject report');
    }
    const data = res;
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'unknown error');
  }
};
