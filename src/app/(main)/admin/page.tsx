import AdminClient from '@/components/admin/AdminClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자',
};

export default function Admin() {
  return (
    <main className="h-full w-full rounded-[50px] bg-[var(--color-background)] px-[26px] py-6 sm:h-200 sm:w-full sm:px-12 sm:py-7">
      <AdminClient />
    </main>
  );
}
