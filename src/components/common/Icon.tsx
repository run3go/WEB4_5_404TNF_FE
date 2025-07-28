import { twMerge } from 'tailwind-merge';

export default function Icon({
  width,
  height,
  left,
  top,
  className,
  onClick,
}: {
  width: string;
  height: string;
  left: string;
  top: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      style={{ width, height, backgroundPosition: `${left} ${top}` }}
      className={twMerge(
        "bg-[url('/images/sprite.svg')] bg-no-repeat dark:bg-[url('/images/dark-sprite.svg')]",
        className,
      )}
      onClick={onClick}
    />
  );
}
