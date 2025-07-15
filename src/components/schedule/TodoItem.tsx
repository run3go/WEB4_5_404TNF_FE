'use client';
import { useState } from 'react';
import Icon from '../common/Icon';
import AddSchedule from './AddSchedule';

export default function TodoItem({ name }: { name: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteTodo = () => {
    // 일정 삭제 api
    // toast
  };

  return (
    <>
      <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
        <span>{name}</span>
        <div className="flex gap-5">
          <Icon
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            width="14px"
            height="14px"
            left="-225px"
            top="-168px"
          />
          <Icon
            onClick={deleteTodo}
            className="cursor-pointer"
            width="14px"
            height="14px"
            left="-266px"
            top="-167px"
          />
        </div>
      </li>
      {isModalOpen && (
        <AddSchedule closeModal={closeModal} isEdit={true} isStart={false} />
      )}
    </>
  );
}
