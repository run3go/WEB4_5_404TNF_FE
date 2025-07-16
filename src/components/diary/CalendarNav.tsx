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
      <button onClick={props.onPreviousClick}>
        <Icon
          className="absolute top-[12px] left-[25%] cursor-pointer"
          width="6px"
          height="10px"
          left="-213px"
          top="-210px"
        />
      </button>
      <button onClick={props.onNextClick}>
        <Icon
          className="absolute top-[12px] right-[28%] cursor-pointer"
          width="6px"
          height="10px"
          left="-234px"
          top="-210px"
        />
      </button>
    </div>
  );
}
