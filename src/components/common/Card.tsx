import { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  className,
  onClick,
  ref,
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  ref?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <div
        className={twMerge(
          'tranistion-all rounded-xl bg-[var(--color-background)] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)] duration-150 sm:p-6 dark:bg-[var(--color-dark-background)]',
          className,
        )}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </div>
    </>
  );
}
