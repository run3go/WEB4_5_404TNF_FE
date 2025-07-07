'use client';

import { useRef, useState } from 'react';
import Icon from './Icon';
import PopupMenu from './PopupMenu';

interface MeatballsMenuProps {
  options: { id: string; label: string; type: 'post' | 'comment' }[];
}

export default function MeatballsMenu({ options }: MeatballsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

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
        <PopupMenu options={options} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
