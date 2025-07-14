import { careGuides } from '@/assets/data/guide';
import { useGuideStore } from '@/stores/guideStore';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Card from '../common/Card';

export default function GuideList() {
  const router = useRouter();

  const setMonth = useGuideStore((state) => state.setMonth);
  const selectedMonth = useGuideStore((state) => state.month);

  const filteredGuides = careGuides.filter(
    (guide) => Math.ceil(guide.week / 4) === selectedMonth,
  );
  const isMoreThanNine = selectedMonth > 9;
  return (
    <div
      className={twMerge(
        'absolute left-[52%] flex -translate-x-1/2 flex-col gap-3 pt-6 pb-13 text-base sm:w-[780px] sm:flex-row sm:flex-wrap',
        isMoreThanNine ? 'bottom-[6%]' : 'top-[13%]',
      )}
      onMouseEnter={() => setMonth(selectedMonth)}
      onMouseLeave={() => setMonth(0)}
    >
      {filteredGuides.map((guide) => (
        <Card
          key={guide.week}
          className="guide-card"
          onClick={() => router.push(guide.url)}
        >
          <span className="text-[var(--color-primary-500)]">
            {guide.week}주차
          </span>
          <span>{guide.title}</span>
        </Card>
      ))}
    </div>
  );
}
