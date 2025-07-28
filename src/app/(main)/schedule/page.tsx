import CustomCalendar from '@/components/schedule/CustomCalendar';
import MobileSchedule from '@/components/schedule/MobileSchedule';

export default function Schedule() {
  return (
    <main className="relative h-full w-screen bg-[var(--color-background)] px-6 py-8 sm:w-full sm:px-45 sm:pt-9 sm:pb-12 dark:bg-[var(--color-black)]">
      <CustomCalendar />
      <MobileSchedule />
    </main>
  );
}
