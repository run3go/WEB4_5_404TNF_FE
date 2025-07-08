'use client';

import { useRef, useState } from 'react';
import Icon from './Icon';
import PopupMenu from './PopupMenu';

interface MeatballsMenuProps {
  options: { id: string; label: string; type: 'post' | 'comment' }[];
  onReportClick?: () => void;
  onEditClick?: () => void;
}

export default function MeatballsMenu({
  options,
  onReportClick,
  onEditClick,
}: MeatballsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleOptionClick = (label: string, type: string) => {
    if (label === '신고하기' && onReportClick) {
      onReportClick();
    }

    if (label === '수정' && type === 'post' && onEditClick) {
      onEditClick();
    }
    setIsOpen(false);
  };
  return (
    <div className="relative" ref={buttonRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <Icon
          width="18px"
          height="10px"
          left="-305px"
          top="-83px"
          className="cursor-pointer"
        />
      </div>
      {isOpen && (
        <PopupMenu
          options={options}
          onSelect={handleOptionClick}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
