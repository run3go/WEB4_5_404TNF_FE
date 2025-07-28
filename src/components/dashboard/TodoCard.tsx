import { setChecklistDone } from '@/api/dashboard';
import alternativeImage from '@/assets/images/alternative-image.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Card from '../common/Card';
import Icon from '../common/Icon';

export default function TodoCard({
  checklist,
  petId,
}: {
  checklist?: DashboardChecklist;
  petId: number;
}) {
  const queryClient = useQueryClient();

  const { mutate: checklistMutate } = useMutation({
    mutationFn: (scheduleId: number) => setChecklistDone(scheduleId),

    onMutate: async (scheduleId) => {
      await queryClient.cancelQueries({
        queryKey: ['dashboard', 'checklist', petId],
      });

      queryClient.setQueryData<DashboardChecklist>(
        ['dashboard', 'checklist', petId],
        (old) =>
          old?.map((item) =>
            item.scheduleId === scheduleId
              ? { ...item, isDone: !item.isDone }
              : item,
          ) ?? [],
      );
      return { checklist };
    },

    onError: (err, scheduleId, context) => {
      if (context?.checklist) {
        queryClient.setQueryData(
          ['dashboard', 'checklist', petId],
          context.checklist,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'checklist', petId],
      });
    },
  });

  checklist?.sort((a, b) => a.scheduleId - b.scheduleId);
  return (
    <Card className="flex h-full w-full flex-col">
      <h2 className="mb-5 text-xs font-medium sm:text-base">오늘의 할 일</h2>
      <ul className="scrollbar-hidden flex grow-1 flex-col items-start gap-3 overflow-y-scroll text-sm select-none sm:text-base">
        {checklist && checklist.length ? (
          checklist.map((item, index) => (
            <li key={index}>
              <div
                className="flex cursor-pointer gap-3"
                onClick={() => checklistMutate(item.scheduleId)}
              >
                <Icon
                  width="22px"
                  height="22px"
                  left={item.isDone ? '-101px' : '-147px'}
                  top="-255px"
                />
                <input
                  className="hidden cursor-pointer"
                  hidden
                  id={`todo${index}`}
                  type="checkbox"
                />
                <span className="leading-[1.2]">{item.name}</span>
              </div>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 self-center sm:text-base">
            <Image
              draggable={false}
              className="mt-16 mb-1 w-16 sm:mt-9 sm:w-25"
              src={alternativeImage}
              alt="등록된 일정이 없습니다"
              width={100}
            />
            <span className="text-xs text-[var(--color-grey)] sm:text-sm">
              등록된 일정이 없습니다
            </span>
          </div>
        )}
      </ul>
    </Card>
  );
}
