'use client';

import { getNotifications, getNotificationSetting } from '@/api/notification';
import { getMyUserInfo } from '@/api/user';
import { useAuthStore } from '@/stores/authStoe';
import { useNotificationStore } from '@/stores/Notification';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingUI from '@/components/common/Loading';

export default function Callback() {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );

  const notiSettingMutation = useMutation({
    mutationFn: getNotificationSetting,
  });

  const getNotiMutation = useMutation({
    mutationFn: getNotifications,
  });
  useEffect(() => {
    const socialLogin = async () => {
      const user = await getMyUserInfo();

      const notiSetting = await notiSettingMutation.mutateAsync();

      const notiList = await getNotiMutation.mutateAsync();

      const userInfo: User = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        role: user.role,
        provider: user.provider,
        imgUrl: user.imgUrl,
      };

      setLogin(userInfo);
      setNotifications(notiList);
      sessionStorage.setItem('userId', user.userId);
      sessionStorage.setItem('isNotiAll', notiSetting?.isNotiAll);
      sessionStorage.setItem('isNotiSchedule', notiSetting?.isNotiSchedule);
      sessionStorage.setItem('isNotiService', notiSetting?.isNotiService);

      router.replace('/');
    };

    socialLogin();
  }, [
    getNotiMutation,
    notiSettingMutation,
    setLogin,
    setNotifications,
    router,
  ]);

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <LoadingUI />
      </div>
    </>
  );
}
