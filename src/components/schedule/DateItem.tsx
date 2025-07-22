'use client';
import { getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import TodoList from './TodoList';
import AddSchedule from './AddSchedule';
import { Schedule } from '@/types/schedule';

export default function DateItem({
  date,
  targetMonth,
  schedules = [],
  isToday,
}: {
  date: number;
  targetMonth: Date;
  schedules?: Schedule[];
  isToday: boolean;
}) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'list' | null>(null);

  const endOfMonth = getDaysInMonth(targetMonth);

  const closeModal = () => {
    // setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <>
      <div
        key={date}
        onClick={() => {
          if (date > 0 && date <= endOfMonth) {
            if (schedules.length > 0) {
              setModalType('list');
            } else {
              setModalType('add');
            }
            // setIsModalOpen(true);
          }
        }}
        className={`h-24 basis-1/7 border-b border-[var(--color-primary-200)] p-3 ${date > 0 && date <= endOfMonth ? 'cursor-pointer transition-colors duration-200 ease-in hover:bg-[var(--color-primary-100)]' : ''}`}
      >
        {date > 0 && date <= endOfMonth && (
          <>
            <div className="flex justify-between">
              <div className="relative flex h-6 w-6 items-center justify-center">
                {isToday && (
                  <div
                    className={`absolute inset-0 -top-[5px] ${String(date).length === 1 || String(date)[0] !== '1' ? '-left-1' : '-left-[2.5px]'} size-8 rounded-full bg-[var(--color-primary-500)]`}
                  />
                )}
                <span className="z-100">{date}</span>
              </div>
              {schedules && schedules.length > 2 && (
                <span className="text-sm text-[var(--color-grey)]">+ more</span>
              )}
            </div>
            <ul>
              {schedules &&
                schedules.slice(0, 2).map((schedule) => (
                  <li
                    key={schedule.scheduleId}
                    className="w-full max-w-[145px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {schedule.name}
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      {modalType === 'add' &&
        createPortal(
          <AddSchedule
            closeModal={closeModal}
            isStart={true}
            isEdit={false}
            fullDate={
              new Date(targetMonth.getFullYear(), targetMonth.getMonth(), date)
            }
          />,
          document.body,
        )}

      {modalType === 'list' &&
        createPortal(
          <TodoList
            type="modal"
            closeModal={closeModal}
            schedules={schedules}
            fullDate={
              new Date(targetMonth.getFullYear(), targetMonth.getMonth(), date)
            }
          />,
          document.body,
        )}

      {/* {isModalOpen &&
        createPortal(
          schedules.length === 0 ? (
            <AddSchedule
              closeModal={closeModal}
              isStart={true}
              isEdit={false}
              fullDate={
                new Date(
                  targetMonth.getFullYear(),
                  targetMonth.getMonth(),
                  date,
                )
              }
            />
          ) : (
            <TodoList
              type="modal"
              closeModal={closeModal}
              schedules={schedules}
              fullDate={
                new Date(
                  targetMonth.getFullYear(),
                  targetMonth.getMonth(),
                  date,
                )
              }
            />
          ),
          document.body,
        )} */}
    </>
  );
}
