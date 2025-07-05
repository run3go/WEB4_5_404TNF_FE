import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <>
      <div
        className={twMerge(
          'rounded-xl bg-[var(--background)] p-6 shadow-[0_3px_8px_rgba(0,0,0,0.24)]',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
