'use client';
import { useEffect, useRef } from 'react';
import Icon from './Icon';

interface PopupMenuProps {
  options: { id: string; label: string; type: 'post' | 'comment' }[];
  onClose: () => void;
  onSelect: (label: string) => void;
}

export default function PopupMenu({
  options,
  onClose,
  onSelect,
}: PopupMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getIcon = (label: string) => {
    if (label === '수정') {
      return <Icon width="14px" height="14px" left="-225px" top="-168px" />;
    }

    if (label === '삭제') {
      return <Icon width="14px" height="14px" left="-266px" top="-167px" />;
    }

    if (label === '신고하기') {
      return <Icon width="14px" height="12px" left="-303px" top="-168px" />;
    }

    return;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-[-3px] mt-2 flex w-[140px] flex-col items-center space-y-2.5 rounded-[20px] border-[3px] border-[var(--color-primary-200)] bg-[#FFFDF7] px-[14px] py-3"
    >
      {options.map((option) => (
        <div
          key={option.label}
          className="flex h-[28px] w-[120px] items-center justify-center gap-2 rounded-[8px] px-2 py-1.5 hover:bg-[#FFCD8C]"
          onClick={() => onSelect(option.label)}
        >
          {getIcon(option.label)}
          <p
            className={`text-[14px] font-medium ${option.label === '삭제' ? 'text-[#ED4848]' : ''}`}
          >{`${option.label === '신고하기' ? '' : option.type === 'post' ? '게시글' : '댓글'} ${option.label}`}</p>
        </div>
      ))}
    </div>
  );
}
