import LandingFeature from '@/components/home/LandingFeature';
import LandingFooter from '@/components/home/LandingFooter';
import LandingIntro from '@/components/home/LandingIntro';
import LandingMockup from '@/components/home/LandingMockup';
import { cookies } from 'next/headers';
export default async function Main() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get('ACCESS_TOKEN')?.value;
  console.log(userId);
  return (
    <>
      <div className="scrollbar-hidden h-[1000px] w-full overflow-x-hidden">
        <LandingIntro />
        <LandingFeature />
        <LandingMockup />
        <LandingFooter />
      </div>
    </>
  );
}
