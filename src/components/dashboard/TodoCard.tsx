import Card from '../common/Card';

export default function TodoCard() {
  return (
    <Card className="flex aspect-[255/322] w-full max-w-[255px] flex-col">
      <h2 className="mb-5 text-xs font-medium sm:text-base">오늘의 할 일</h2>
      <ul className="scrollbar-hidden flex grow-1 flex-col gap-3 overflow-y-scroll text-sm select-none sm:text-base">
        <li>
          <input className="mr-[13px] cursor-pointer" id="1" type="checkbox" />
          <label className="cursor-pointer" htmlFor="1">
            잘 먹기
          </label>
        </li>
        <li>
          <input className="mr-[13px] cursor-pointer" id="2" type="checkbox" />
          <label className="cursor-pointer" htmlFor="2">
            잘 자기
          </label>
        </li>
        <li>
          <input className="mr-[13px] cursor-pointer" id="3" type="checkbox" />
          <label className="cursor-pointer" htmlFor="3">
            끝내주게 놀기
          </label>
        </li>
      </ul>
    </Card>
  );
}
