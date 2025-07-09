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
          'rounded-xl bg-[var(--color-background)] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)] sm:p-6',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
