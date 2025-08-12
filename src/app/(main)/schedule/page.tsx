import CustomCalendar from '@/components/schedule/CustomCalendar';
import MobileSchedule from '@/components/schedule/MobileSchedule';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '일정',
};

export default function Schedule() {
  return (
    <main className="relative h-full w-screen bg-[var(--color-background)] px-6 py-8 md:w-full md:pt-9 md:pb-12 lg:px-15 xl:px-25 2xl:px-40 dark:bg-[var(--color-black)]">
      <CustomCalendar />
      <MobileSchedule />
    </main>
  );
}
