import Card from '../common/Card';
import Icon from '../common/Icon';

export default function TodoList() {
  return (
    <Card className="mt-8 max-h-70 min-h-31 w-full text-sm sm:hidden">
      <div className="mb-3 flex justify-between text-[var(--color-grey)]">
        <span>일정 목록</span>
        <span>2025. 7. 5</span>
      </div>
      <ul className="scrollbar-hidden flex max-h-55 flex-col items-center overflow-y-scroll">
        {/* <Image
                className="mt-5"
                src={alternative}
                alt="대체 이미지"
                width={40}
                height={28}
                priority
              />
              <span className="mt-2 mb-3 text-[var(--color-grey)]">
                등록된 일정이 없습니다
              </span> */}
        <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
          <span>할 일1</span>
          <div className="flex gap-5">
            <Icon width="14px" height="14px" left="-225px" top="-168px" />
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>
        </li>
        <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
          <span>할 일2</span>
          <div className="flex gap-5">
            <Icon width="14px" height="14px" left="-225px" top="-168px" />
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>
        </li>
        <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
          <span>할 일3</span>
          <div className="flex gap-5">
            <Icon width="14px" height="14px" left="-225px" top="-168px" />
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>
        </li>
        <li className="flex w-full items-center justify-between border-b border-[var(--color-primary-300)] p-3">
          <span>할 일3</span>
          <div className="flex gap-5">
            <Icon width="14px" height="14px" left="-225px" top="-168px" />
            <Icon width="14px" height="14px" left="-266px" top="-167px" />
          </div>
        </li>
      </ul>
    </Card>
  );
}
