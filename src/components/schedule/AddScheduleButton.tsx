'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../common/Icon';
import AddSchedule from './AddSchedule';

export default function AddScheduleButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden"
        onClick={() => setIsModalOpen(true)}
      >
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
      {isModalOpen &&
        createPortal(<AddSchedule closeModal={closeModal} />, document.body)}
    </>
  );
}
