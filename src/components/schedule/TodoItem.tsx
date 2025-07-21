'use client';
import { useRef, useState } from 'react';
import Icon from '../common/Icon';
import AddSchedule from './AddSchedule';
import PopupMenu from '../common/PopupMenu';
import { useDeleteSchedule } from '@/lib/hooks/schedule/useDeleteSchedule';
import { Schedule } from '@/types/schedule';
import { useAuthStore } from '@/stores/authStoe';
import PopupMenuPortal from '../common/PopupMenuPortal';

export default function TodoItem({
  name,
  schedule,
  type,
}: {
  name?: string;
  schedule?: Schedule;
  type?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { mutate: deleteSchedule } = useDeleteSchedule();
  const { userInfo } = useAuthStore();

  const buttonRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY + 10,
        left: rect.left + window.scrollX - 125,
      });
    }

    setIsMenuOpen((prev) => !prev);
  };

  const handleSelect = (label: string) => {
    if (label === '기본일정') {
      const res = confirm('일정을 삭제하시겠습니까?');

      if (res) {
        deleteTodo(true);
      }
    } else if (label === '이 일정만 삭제') {
      // console.log('이 일정만 삭제');
      const res = confirm('일정을 삭제하시겠습니까?');

      if (res) {
        deleteTodo(false);
      }
    } else {
      // console.log('반복 일정 전체 삭제');
      const res = confirm('모든 반복 일정을 삭제하시겠습니까?');

      if (res) {
        deleteTodo(true);
      }
    }

    setIsMenuOpen(false);
  };

  // 일정 삭제
  const deleteTodo = (cycleLink: boolean) => {
    if (schedule?.petId && schedule?.scheduleId && userInfo) {
      deleteSchedule({
        petId: schedule?.petId,
        userId: userInfo?.userId,
        scheduleId: schedule?.scheduleId,
        cycleLink: cycleLink,
      });
    } else {
      return;
    }
  };

  return (
    <>
      <li className="flex w-full cursor-default items-center justify-between border-b border-[var(--color-primary-300)] p-3">
        <div className="flex items-center justify-center">
          <div className="mr-2 max-w-[80px] truncate rounded-[8px] bg-[var(--color-primary-300)] px-2 py-1 text-sm">
            {schedule?.petName}
          </div>

          <span className="max-w-[340px] truncate">
            {name ? name : schedule?.name}
          </span>
        </div>
        <div className="relative flex gap-4">
          <Icon
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            width="14px"
            height="14px"
            left="-225px"
            top="-168px"
          />
          <div
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();

              if (schedule?.cycle === 'NONE') {
                handleSelect('기본일정');
              } else {
                if (type === 'mobile') {
                  openMenu();
                } else {
                  setIsMenuOpen((prev) => !prev);
                }
              }
            }}
            className="cursor-pointer"
          >
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>

          {/* {isMenuOpen && (
            <div className="absolute top-3 left-13 z-50">
              <PopupMenu
                options={[
                  { id: '0', label: '이 일정만 삭제', type: 'delete' },
                  { id: '1', label: '반복 일정 전체 삭제', type: 'delete' },
                ]}
                onSelect={handleSelect}
                onClose={() => setIsMenuOpen(false)}
                className={'text-[var(--color-black)]'}
              />
            </div>
          )} */}

          {isMenuOpen &&
            (type === 'mobile' ? (
              <PopupMenuPortal
                options={[
                  { id: '0', label: '이 일정만 삭제' },
                  { id: '1', label: '반복 일정 전체 삭제' },
                ]}
                onSelect={handleSelect}
                onClose={() => setIsMenuOpen(false)}
                position={popupPosition}
                triggerRef={buttonRef}
              />
            ) : (
              <div className="absolute top-3 left-13 z-50">
                <PopupMenu
                  options={[
                    { id: '0', label: '이 일정만 삭제', type: 'delete' },
                    { id: '1', label: '반복 일정 전체 삭제', type: 'delete' },
                  ]}
                  onSelect={handleSelect}
                  onClose={() => setIsMenuOpen(false)}
                  className={'text-[var(--color-black)]'}
                />
              </div>
            ))}
        </div>
      </li>
      {isModalOpen && (
        <AddSchedule
          closeModal={closeModal}
          isStart={false}
          isEdit={true}
          schedule={schedule}
        />
      )}
    </>
  );
}
