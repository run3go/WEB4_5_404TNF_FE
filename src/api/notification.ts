const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNotifications = async () => {
  const res = await fetch(`${baseURL}/api/notification/v1/notifications`, {
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '알림 가져오기 실패');
  }

  return data;
};

export const removeNotification = async () => {
  const res = await fetch(`${baseURL}/api/notification/v1`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '알림 전체 삭제 실패');
  }

  return data;
};
