'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PopupPortalProps {
  options: {
    id: string;
    label: string;
  }[];
  onClose: () => void;
  onSelect: (label: string) => void;
  position: { top: number; left: number };
  triggerRef: React.RefObject<HTMLElement | null>;
}

export default function PopupMenuPortal({
  options,
  onClose,
  onSelect,
  position,
  triggerRef,
}: PopupPortalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, triggerRef]);

  return createPortal(
    <div
      ref={ref}
      style={{ top: position.top, left: position.left }}
      className={`absolute top-full right-[-3px] z-50 mt-2 flex w-[150px] flex-col space-y-2.5 rounded-[20px] border-[1px] border-[var(--color-primary-200)] bg-[var(--color-background)] px-[12px] py-[14px] dark:bg-[var(--color-dark-background)]`}
    >
      {options.map((option) => (
        <div
          key={option.label}
          className={`flex h-[28px] w-[125px] cursor-pointer items-center justify-start gap-2 rounded-[8px] pl-2 hover:bg-[#FFCD8C] dark:hover:text-[var(--color-black)]`}
          onClick={() => onSelect(option.label)}
        >
          <p className="pt-[3px] text-left text-[14px] font-medium">
            {option.label}
          </p>
        </div>
      ))}
    </div>,
    document.body,
  );
}
