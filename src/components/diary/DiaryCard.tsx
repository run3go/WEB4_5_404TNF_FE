import { twMerge } from 'tailwind-merge';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function DiaryCard({
  title,
  hasAddBtn = false,
  children,
  className,
}: {
  title: string;
  hasAddBtn?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={twMerge(
        'flex flex-col border border-[var(--color-primary-500)] text-sm sm:text-base',
        className,
      )}
    >
      <div
        className={twMerge(
          'mb-3 flex items-center justify-start border-b border-[var(--color-primary-500)] pb-3 sm:mb-5',
          hasAddBtn && 'justify-between',
        )}
      >
        <h2 className="text-sm leading-[1.2] font-extrabold text-[var(--color-primary-500)] sm:text-base">
          {title}
        </h2>
        {hasAddBtn && (
          <Icon
            className="cursor-pointer"
            width="12px"
            height="12px"
            left="-262px"
            top="-259px"
          />
        )}
      </div>
      {children}
    </Card>
  );
}
