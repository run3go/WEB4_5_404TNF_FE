'use client';

import Icon from '@/components/common/Icon';

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function PasswordToggleButton({
  isVisible,
  onClick,
}: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-[28px] right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-300 sm:top-[34px]"
    >
      {isVisible ? (
        <Icon
          width="16px"
          height="16px"
          left="-186px"
          top="-167px"
          className="scale-75 skew-x-12 cursor-pointer sm:scale-100"
        />
      ) : (
        <Icon
          width="16px"
          height="16px"
          left="-186px"
          top="-167px"
          className="scale-75 cursor-pointer sm:scale-100"
        />
      )}
    </button>
  );
}
