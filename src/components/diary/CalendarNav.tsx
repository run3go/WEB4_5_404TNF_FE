import { HTMLAttributes, MouseEventHandler } from 'react';
import Icon from '../common/Icon';

export default function CalendarNav(
  props: {
    onPreviousClick?: MouseEventHandler<HTMLButtonElement>;
    onNextClick?: MouseEventHandler<HTMLButtonElement>;
    isPending?: boolean;
  } & HTMLAttributes<HTMLElement>,
) {
  return (
    <div className="relative flex w-full">
      <button
        className="absolute top-[20px] left-[28%] -translate-y-1/2"
        type="button"
        disabled={props.isPending}
        onClick={props.onPreviousClick}
      >
        <Icon
          className="cursor-pointer"
          width="6px"
          height="10px"
          left="-175px"
          top="-451px"
        />
      </button>
      <button
        className="absolute top-[20px] right-[28%] -translate-y-1/2"
        type="button"
        disabled={props.isPending}
        onClick={props.onNextClick}
      >
        <Icon
          className="cursor-pointer sm:top-[12px]"
          width="6px"
          height="10px"
          left="-196px"
          top="-451px"
        />
      </button>
    </div>
  );
}
