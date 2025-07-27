import alternativeImage from '@/assets/images/alternative-image.svg';
import Image from 'next/image';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function TodoCard({
  checklist,
}: {
  checklist?: DashboardChecklist;
}) {
  return (
    <Card className="flex h-full w-full max-w-[255px] flex-col">
      <h2 className="mb-5 text-xs font-medium sm:text-base">오늘의 할 일</h2>
      <ul className="scrollbar-hidden flex grow-1 flex-col items-center gap-3 overflow-y-scroll text-sm select-none sm:text-base">
        {checklist ? (
          checklist.map((item, index) => (
            <li key={index}>
              <label
                className="flex cursor-pointer items-center gap-2"
                htmlFor="todo1"
              >
                <Icon
                  width="22px"
                  height="22px"
                  left={item.isDone ? '-100px' : '-146px'}
                  top="-254px"
                />
                <input
                  className="mr-[13px] cursor-pointer"
                  hidden
                  id="todo1"
                  type="checkbox"
                />
                <span className="leading-[1.2]">{item.isDone}</span>
              </label>
            </li>
          ))
        ) : (
          <>
            <Image
              draggable={false}
              className="mt-9 mb-1"
              src={alternativeImage}
              alt="등록된 일정이 없습니다"
              width={100}
            />
            <span className="text-sm text-[var(--color-grey)]">
              등록된 일정이 없습니다
            </span>
          </>
        )}
      </ul>
    </Card>
  );
}
