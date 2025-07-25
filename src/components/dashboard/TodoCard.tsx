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
      <ul className="scrollbar-hidden flex grow-1 flex-col gap-3 overflow-y-scroll text-sm select-none sm:text-base">
        {checklist && checklist.length ? (
          checklist.map((item, index) => (
            <li key={index} className="flex gap-3">
              <label className="cursor-pointer" htmlFor="todo1">
                <Icon
                  width="22px"
                  height="22px"
                  left={item.isDone ? '-101px' : '-147px'}
                  top="-255px"
                />
                <input
                  className="hidden cursor-pointer"
                  hidden
                  id="todo1"
                  type="checkbox"
                />
              </label>
              <span className="leading-[1.2]">{item.name}</span>
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
