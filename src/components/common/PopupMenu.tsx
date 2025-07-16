'use client';
import { useEffect, useRef } from 'react';
import Icon from './Icon';
import { twMerge } from 'tailwind-merge';

interface PopupMenuProps {
  options: {
    id: string;
    label: string;
    type: 'post' | 'comment' | 'link' | 'delete';
    report?: 'profile';
  }[];
  onClose: () => void;
  onSelect: (label: string) => void;
  isProfile?: boolean;
  className?: string;
}

export default function PopupMenu({
  options,
  onClose,
  onSelect,
  isProfile,
  className,
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
    if (label === '프로필 이동') {
      return <Icon width="14px" height="14px" left="-225px" top="-168px" />;
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
      className={`absolute ${isProfile ? 'top-[-55px] left-[150px] sm:top-[-70px] sm:left-[200px]' : 'top-full right-[-3px]'} z-50 mt-2 flex flex-col space-y-2.5 rounded-[20px] border-[3px] border-[var(--color-primary-200)] bg-[#FFFDF7] px-[12px] py-[14px] ${options[0].type === 'delete' ? 'w-[155px]' : 'max-w-[140px]'}`}
    >
      {options.map((option) => (
        <div
          key={option.label}
          className={`flex h-[28px] ${
            option.type === 'link' || option.report === 'profile'
              ? 'w-[112px]'
              : option.label === '신고하기'
                ? 'w-[98px]'
                : option.type === 'post'
                  ? 'w-[112px]'
                  : option.type === 'delete'
                    ? 'w-[125px]'
                    : 'w-[98px]'
          } items-center justify-start gap-2 rounded-[8px] pl-2 hover:bg-[#FFCD8C]`}
          onClick={() => onSelect(option.label)}
        >
          {getIcon(option.label)}
          <p
            className={twMerge(
              `text-[14px] font-medium ${
                option.label === '수정' || option.label === '프로필 이동'
                  ? ''
                  : 'text-left text-[#ED4848]'
              } pt-[3px]`,
              className,
            )}
          >
            {option.label === '신고하기' ||
            option.label === '프로필 이동' ||
            option.type === 'delete'
              ? option.label
              : `${option.type === 'post' ? '게시글' : '댓글'} ${option.label}`}
          </p>
        </div>
      ))}
    </div>
  );
}
