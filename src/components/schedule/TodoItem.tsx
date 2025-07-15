'use client';
import { useState } from 'react';
import Icon from '../common/Icon';
import AddSchedule from './AddSchedule';
// import Image from 'next/image';
// import pet from '../../assets/images/dog_img.png';

export default function TodoItem({ name, id }: { name: string; id?: number }) {
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
        <div className="flex items-center justify-center">
          <span className="mr-2 rounded-[8px] bg-[var(--color-primary-300)] px-2 py-1 text-sm">
            {/* <Image
              src={pet}
              // className="h-4 w-4 rounded-full"
              width={16}
              height={16}
              alt="강아지 프로필"
            /> */}
            이마음
          </span>

          {name}
        </div>
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
        <AddSchedule
          closeModal={closeModal}
          isStart={false}
          isEdit={true}
          sId={id}
        />
      )}
    </>
  );
}
