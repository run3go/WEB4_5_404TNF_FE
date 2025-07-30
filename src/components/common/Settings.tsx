import { useEffect, useRef, useState } from 'react';
import ToggleButton from './ToggleButton';

export default function Settings({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isNotiAll, setIsNotiAll] = useState(
    sessionStorage.getItem('isNotiAll') === 'true',
  );
  const [isNotiSchedule, setIsNotiSchedule] = useState(
    sessionStorage.getItem('isNotiSchedule') === 'true',
  );
  const [isNotiService, setIsNotiService] = useState(
    sessionStorage.getItem('isNotiService') === 'true',
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-[20%] left-[10%] flex w-58 flex-col items-center gap-2 rounded-[20px] border border-[var(--color-primary-200)] bg-[var(--color-background)] p-4 shadow-md dark:bg-[#343434] dark:text-[var(--color-background)]"
      ref={modalRef}
    >
      <div className="w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <span className="text-base font-semibold">다크 모드</span>
          </div>
          <ToggleButton id="mode" darkmode />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-lg font-semibold">알림 설정</h2>
          <div className="flex items-center justify-between">
            <span>전체</span>
            <ToggleButton
              id="ALL"
              isNoti={isNotiAll}
              setIsNotiAll={setIsNotiAll}
              setIsNotiSchedule={setIsNotiSchedule}
              setIsNotiService={setIsNotiService}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>일정</span>
            <ToggleButton
              id="SCHEDULE"
              isNoti={isNotiSchedule}
              setIsNotiAll={setIsNotiAll}
              setIsNotiSchedule={setIsNotiSchedule}
              setIsNotiService={setIsNotiService}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>서비스</span>
            <ToggleButton
              id="SERVICE"
              isNoti={isNotiService}
              setIsNotiAll={setIsNotiAll}
              setIsNotiSchedule={setIsNotiSchedule}
              setIsNotiService={setIsNotiService}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
