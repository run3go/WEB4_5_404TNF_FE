'use client';

import Icon from '../common/Icon';
import { useEffect, useRef, useState } from 'react';

export default function DiaryOptionsMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node))
        return;
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Icon
        width="18px"
        height="4px"
        left="-305px"
        top="-83px"
        className="mr-5 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 z-50 mt-2 w-[155px] rounded-xl border border-[var(--color-primary-200)] bg-[var(--color-background)] shadow-lg"
        >
          <ul className="m-2 text-sm font-medium">
            <li
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
              className="cursor-pointer rounded-[8px] px-1 py-2 hover:bg-[var(--color-primary-200)]"
            >
              <div className="flex items-center justify-center gap-2">
                <Icon width="14px" height="14px" left="-225px" top="-168px" />
                <p>멍멍일지 수정</p>
              </div>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
                onDelete();
              }}
              className="cursor-pointer rounded-[8px] px-1 py-2 text-[var(--color-red)] hover:bg-[var(--color-primary-200)]"
            >
              <div className="flex items-center justify-center gap-2">
                <Icon width="14px" height="14px" left="-266px" top="-167px" />
                <p>멍멍일지 삭제</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
