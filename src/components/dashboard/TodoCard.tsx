import Card from '../common/Card';
import Icon from '../common/Icon';

export default function TodoCard() {
  const checked = false;
  return (
    <Card className="flex aspect-[255/322] w-full max-w-[255px] flex-col">
      <h2 className="mb-5 text-xs font-medium sm:text-base">오늘의 할 일</h2>
      <ul className="scrollbar-hidden flex grow-1 flex-col gap-3 overflow-y-scroll text-sm select-none sm:text-base">
        <li>
          <label
            className="flex cursor-pointer items-center gap-2"
            htmlFor="todo1"
          >
            <Icon
              width="22px"
              height="22px"
              left={checked ? '-100px' : '-146px'}
              top="-254px"
            />
            <input
              className="mr-[13px] cursor-pointer"
              hidden
              id="todo1"
              type="checkbox"
            />
            <span className="leading-[1.2]">잘 먹기</span>
          </label>
        </li>
        <li>
          <label
            className="flex cursor-pointer items-center gap-2"
            htmlFor="todo2"
          >
            <Icon width="22px" height="22px" left="-100px" top="-254px" />
            <input
              className="mr-[13px] cursor-pointer"
              hidden
              id="todo2"
              type="checkbox"
            />
            <span className="leading-[1.2]">잘 자기</span>
          </label>
        </li>
        <li>
          <label
            className="flex cursor-pointer items-center gap-2"
            htmlFor="todo3"
          >
            <Icon width="22px" height="22px" left="-100px" top="-254px" />
            <input
              className="mr-[13px] cursor-pointer"
              hidden
              id="todo3"
              type="checkbox"
            />
            <span className="leading-[1.2]">끝내주게 놀기</span>
          </label>
        </li>
      </ul>
    </Card>
  );
}
