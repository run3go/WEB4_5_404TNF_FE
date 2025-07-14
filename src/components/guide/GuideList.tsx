import { careGuides } from '@/assets/data/guide';
import { useGuideStore } from '@/stores/guideStore';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';
import Card from '../common/Card';

export default function GuideList() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const router = useRouter();

  const setMonth = useGuideStore((state) => state.setMonth);
  const selectedMonth = useGuideStore((state) => state.month);

  const filteredGuides = careGuides.filter(
    (guide) => Math.ceil(guide.week / 4) === selectedMonth,
  );
  const isMoreThanNine = selectedMonth > 9;

  const closeModal = () => {
    setMonth(0);
  };

  if (isMobile) {
    return createPortal(
      <>
        <div
          className="fixed inset-0 z-200 bg-[var(--color-black)] opacity-50"
          onClick={closeModal}
        />
        <div className="fixed top-1/2 left-1/2 z-201 flex w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col gap-2">
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
      </>,
      document.body,
    );
  } else
    return (
      <div
        className={twMerge(
          'fixed left-[52%] z-201 flex -translate-x-1/2 flex-col gap-3 pt-6 pb-13 text-base sm:absolute sm:w-[780px] sm:flex-row sm:flex-wrap',
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
