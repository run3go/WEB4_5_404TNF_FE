import DashboardClient from '@/components/dashboard/DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드',
};

export default async function Dashboard() {
  return <DashboardClient />;
}
