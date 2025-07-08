import Card from './Card';
import Icon from './Icon';

export default function MobileTitle({ title }: { title: string }) {
  return (
    <>
      <Card className="fixed z-100 flex h-14 w-screen items-center justify-center rounded-none bg-[var(--color-background)] px-4">
        <Icon
          className="absolute left-6"
          width="12px"
          height="20px"
          left="-107px"
          top="-164px"
        />
        <h1 className="leading-[1.2]">{title}</h1>
      </Card>
      {/* 헤더 아래 공간 */}
      <div className="h-14 w-screen" />
    </>
  );
}
