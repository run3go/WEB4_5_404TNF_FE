'use client';
import Card from './Card';
import Icon from './Icon';

export default function MobileTitle({
  title,
  onClick,
  closePage,
}: {
  title: string;
  onClick: () => void;
  closePage: () => void;
}) {
  return (
    <>
      <Card className="fixed z-100 flex h-18 w-screen items-center justify-between rounded-none bg-[var(--color-background)] px-4">
        <Icon
          onClick={closePage}
          width="12px"
          height="20px"
          left="-107px"
          top="-164px"
        />
        <h1 className="leading-[1.2]">{title}</h1>
        <span
          onClick={onClick}
          className="leading-[1.2] text-[var(--color-primary-500)]"
        >
          저장
        </span>
      </Card>
    </>
  );
}
