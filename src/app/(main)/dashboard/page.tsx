import { getPetList } from '@/api/dashboard';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function Dashboard() {
  const petList: PetProfile[] = await getPetList('10037');

  return <DashboardClient petList={petList} />;
}
