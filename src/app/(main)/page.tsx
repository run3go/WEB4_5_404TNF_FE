import LandingFeature from '@/components/home/LandingFeature';
import LandingFooter from '@/components/home/LandingFooter';
import LandingIntro from '@/components/home/LandingIntro';
import LandingMockup from '@/components/home/LandingMockup';

export default async function Main() {
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
