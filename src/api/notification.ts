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

export const removeNotifications = async () => {
  const res = await fetch(`${baseURL}/api/notification/v1`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '알림 전체 삭제 실패');
  }

  return true;
};

export const removeNotification = async ({
  notiId,
  type,
}: {
  notiId: number;
  type: NotiType;
}) => {
  const res = await fetch(
    `${baseURL}/api/notification/v1/notifications/${notiId}/${type}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '알림 전체 삭제 실패');
  }

  return true;
};

export const getNotificationSetting = async () => {
  const res = await fetch(`${baseURL}/api/notification/v1/setting`, {
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '알림 세팅 가져오기 실패');
  }

  return data;
};

export const changeNotificationSetting = async (target: NotiTarget) => {
  const res = await fetch(
    `${baseURL}/api/notification/v1/setting?target=${target}`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '알림 전체 삭제 실패');
  }

  return data;
};

export const readNotification = async ({
  notiId,
  type,
}: {
  notiId: number;
  type: NotiType;
}) => {
  const res = await fetch(
    `${baseURL}/api/notification/v1/notifications/${notiId}/${type}`,
    {
      method: 'PATCH',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '알림 개별 읽기 실패');
  }

  return true;
};
