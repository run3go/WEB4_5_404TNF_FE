import { changeNotificationSetting } from '@/api/notification';
import { useThemeStore } from '@/stores/themeStore';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export default function ToggleButton({
  id,
  darkmode = false,
  isNoti,
  setIsNotiAll,
  setIsNotiSchedule,
  setIsNotiService,
}: {
  id: NotiTarget | 'mode';
  darkmode?: boolean;
  isNoti?: boolean;
  setIsNotiAll?: Dispatch<SetStateAction<boolean>>;
  setIsNotiSchedule?: Dispatch<SetStateAction<boolean>>;
  setIsNotiService?: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useThemeStore((state) => state.theme);
  const toggleThemeMode = useThemeStore((state) => state.toggleThemeMode);
  const notificationSettingMutation = useMutation({
    mutationFn: changeNotificationSetting,
    onSuccess: (data) => {
      setIsNotiAll?.(data.isNotiAll);
      setIsNotiSchedule?.(data.isNotiSchedule);
      setIsNotiService?.(data.isNotiService);
      sessionStorage.setItem('isNotiAll', data.isNotiAll);
      sessionStorage.setItem('isNotiSchedule', data.isNotiSchedule);
      sessionStorage.setItem('isNotiService', data.isNotiService);
    },
  });
  const toggleNotification = async () => {
    notificationSettingMutation.mutate(id as NotiTarget);
  };

  if (darkmode) {
    return (
      /*
        Copyright (c) 2025 by Koderian (https://codepen.io/koderian/pen/wvvvrgz)
        Licensed under the MIT License.
        See full license at the bottom of this file or at https://opensource.org/licenses/MIT
      */
      <div className="toggleWrapper">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          className="dn"
          id="dn"
          onChange={toggleThemeMode}
        />
        <label htmlFor="dn" className="toggle">
          <span className="toggle__handler">
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    );
  } else
    return (
      <>
        <input
          className="toggleInput"
          type="checkbox"
          checked={isNoti}
          id={id}
          onChange={toggleNotification}
          hidden
        />
        <label htmlFor={id} className="toggleSwitch">
          <span className="toggleButton" />
        </label>
      </>
    );
}
