'use client';
import { getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import TodoList from './TodoList';

export default function DateItem({
  date,
  targetMonth,
  schedules,
}: {
  date: number;
  targetMonth: Date;
  schedules: {
    scheduleId: number;
    date: string;
    name: string;
    isDone: boolean;
  }[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const endOfMonth = getDaysInMonth(targetMonth);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        key={date}
        className="h-24 basis-1/7 cursor-pointer border-b border-[var(--color-primary-200)] p-3 transition-colors duration-200 ease-in hover:bg-[var(--color-primary-100)]"
        onClick={() => setIsModalOpen(true)}
      >
        {date > 0 && date <= endOfMonth && (
          <>
            <div className="flex justify-between">
              <span>{date}</span>
              {schedules.length > 2 && (
                <span className="text-sm text-[var(--color-grey)]">+ more</span>
              )}
            </div>
            <ul>
              {schedules &&
                schedules.slice(0, 2).map((schedule) => (
                  <li
                    key={schedule.scheduleId}
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {schedule.name}
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      {isModalOpen &&
        createPortal(
          <TodoList type="modal" closeModal={closeModal} />,
          document.body,
        )}
    </>
  );
}
