import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Card from '../common/Card';
import BarGraph from './graph/BarGraph';

export default function WalkCard({ walking }: { walking?: DashboardWalking }) {
  const isLaptop = useMediaQuery({
    query: '(max-width: 1537px)',
  });
  const router = useRouter();
  if (walking) {
    if (walking.length === 0) {
      return (
        <Card className={`h-full ${isLaptop ? 'w-full' : 'w-60'}`}>
          <h2 className="font-medium">산책 시간</h2>
          <div className="relative top-[calc(50%-24px)] flex -translate-y-1/2 flex-col items-center gap-5">
            <span>등록된 산책 기록이 없어요</span>
            <button
              className="cursor-pointer rounded-full bg-[var(--color-primary-200)] px-4 py-2 transition-all hover:bg-[var(--color-primary-300)] dark:bg-[var(--color-primary-300)] dark:text-[var(--color-black)] dark:hover:bg-[var(--color-primary-500)]"
              onClick={() => router.push('/diary/write')}
            >
              지금 기록하기
            </button>
          </div>
        </Card>
      );
    } else {
      return (
        <Card
          className={`flex flex-col ${isLaptop ? 'h-80 w-full' : 'h-full w-60'}`}
        >
          <h2 className="mb-8 font-medium">산책 시간</h2>
          <BarGraph walking={walking} />
        </Card>
      );
    }
  }
}
