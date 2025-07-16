'use client';
import { useState } from 'react';
import Icon from '../common/Icon';
import AddSchedule from './AddSchedule';
import PopupMenu from '../common/PopupMenu';

export default function TodoItem({
  name,
  schedule,
}: {
  name?: string;
  schedule?: Schedule;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (label: string) => {
    if (label === '이 일정만 삭제') {
      console.log('이 일정만 삭제');
      // deleteTodo(false);
    } else {
      console.log('반복 일정 전체 삭제');
      // deleteTodo(true);
    }

    setIsMenuOpen(false);
  };

  // const deleteTodo = (cycleLink: boolean) => {
  //   // 일정 삭제 api
  //   // toast
  // };

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
        <div className="relative flex gap-5">
          <Icon
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            width="14px"
            height="14px"
            left="-225px"
            top="-168px"
          />
          <Icon
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="cursor-pointer"
            width="14px"
            height="14px"
            left="-266px"
            top="-167px"
          />

          {isMenuOpen && (
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
          )}
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
