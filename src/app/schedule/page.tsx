'use client';
import Icon from '@/components/common/Icon';
import CustomCalendar from '@/components/schedule/CustomCalendar';
import MobileCalendar from '@/components/schedule/MobileCalendar';
import TodoList from '@/components/schedule/TodoList';
import { useRef } from 'react';

export default function Schedule() {
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={mainRef}
      className="h-[calc(100%-72px)] w-screen bg-[var(--color-background)] px-6 py-8 sm:h-200 sm:w-full sm:px-25 sm:pt-9 sm:pb-12"
    >
      <CustomCalendar />
      <MobileCalendar />
      <TodoList />
      <div className="fixed right-4 bottom-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--color-primary-300)] sm:hidden">
        <Icon width="20px" height="20px" left="-266px" top="-75px" />
      </div>
      {/* {mainRef.current && createPortal(<AddSchedule />, mainRef.current)} */}
    </main>
  );
}
