'use client';
import { getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AddSchedule from './AddSchedule';
import TodoList from './TodoList';

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
        className={`h-24 basis-1/7 border-b border-[var(--color-primary-200)] px-2 py-2 ${date > 0 && date <= endOfMonth ? 'cursor-pointer transition-colors duration-200 ease-in hover:bg-[var(--color-primary-100)] dark:hover:bg-[#444444]' : ''}`}
      >
        {date > 0 && date <= endOfMonth && (
          <>
            <div className="mb-1 flex justify-between">
              <div className="relative flex size-6 items-center justify-center text-xs lg:size-8 lg:text-base">
                {isToday && (
                  <div
                    className={`absolute inset-0 rounded-full bg-[var(--color-primary-500)]`}
                  />
                )}
                <span className="relative z-10">{date}</span>
              </div>
              {schedules && schedules.length > 2 && (
                <span className="text-xs text-[var(--color-grey)] lg:text-sm">
                  + more
                </span>
              )}
            </div>
            <ul>
              {schedules &&
                schedules.slice(0, 2).map((schedule) => (
                  <li
                    key={schedule.scheduleId}
                    className="w-full max-w-[145px] truncate overflow-hidden px-1 text-sm text-ellipsis whitespace-nowrap lg:text-[15px]"
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
