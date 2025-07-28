import { HTMLAttributes, MouseEventHandler } from 'react';
import Icon from '../common/Icon';

export default function CalendarNav(
  props: {
    onPreviousClick?: MouseEventHandler<HTMLButtonElement>;
    onNextClick?: MouseEventHandler<HTMLButtonElement>;
  } & HTMLAttributes<HTMLElement>,
) {
  return (
    <div className="flex">
      <button type="button" onClick={props.onPreviousClick}>
        <Icon
          className="absolute top-[3.5%] left-[28%] cursor-pointer sm:top-[12px]"
          width="6px"
          height="10px"
          left="-175px"
          top="-451px"
        />
      </button>
      <button type="button" onClick={props.onNextClick}>
        <Icon
          className="absolute top-[3.5%] right-[28%] cursor-pointer sm:top-[12px]"
          width="6px"
          height="10px"
          left="-196px"
          top="-451px"
        />
      </button>
    </div>
  );
}
