'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../common/Icon';

export default function RoadmapPoint() {
  const [isActive, setIsActive] = useState(false);
  if (isActive) {
    return (
      <div
        className={twMerge(
          'absolute top-[40%] left-1/2 -translate-x-1/2 scale-60 sm:top-[60%] sm:scale-100',
        )}
      >
        <Icon
          className="sm:scale-80"
          width="50px"
          height="50px"
          left="-27px"
          top="-353px"
        />
      </div>
    );
  } else {
    return (
      <div
        className={twMerge(
          'absolute top-[80%] h-[15px] w-[15px] cursor-pointer rounded-full bg-[#d9d9d9] hover:bg-[var(--color-grey)] sm:h-[25px] sm:w-[25px]',
          `left-1/2 -translate-x-1/2`,
        )}
        onClick={() => setIsActive((state) => !state)}
      />
    );
  }
}
