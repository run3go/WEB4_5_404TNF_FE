import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  transformFeedingList,
  transformWalkingList,
} from '../../../utils/diary/diaryTransform';
import { useCreateDiary } from '../api/useCreateDiary';
import { useUpdateDiary } from '../api/useUpdateDiary';
import { runDiaryValidation } from '@/lib/utils/diary/diaryValidation';
import { Toast } from '@/components/common/Toast';

type Props = {
  feedingList: FeedEntry[];
  walkingList: WalkEntry[];
  weight: string;
  sleepTime: string;
  note: string;
  recordAt: string;
  petId: number;
  hasDiary: boolean;
  diaryData?: DiaryCheckResponse;
  onSubmitting: (submitting: boolean) => void;
};

export function useDiarySubmit({
  feedingList,
  walkingList,
  weight,
  sleepTime,
  note,
  recordAt,
  petId,
  hasDiary,
  diaryData,
  onSubmitting,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useCreateDiary();
  const updateMutation = useUpdateDiary();

  const handleSubmit = async (): Promise<number> => {
    return new Promise((resolve, reject) => {
      onSubmitting(true);

      const error = runDiaryValidation({
        feedingList,
        walkingList,
        weight,
        sleepTime,
        note,
      });

      if (error) {
        Toast.error(error);
        onSubmitting(false);
        return reject(error);
      }

      const hasFeedingInput = feedingList.some(
        (f) => f.hour || f.minute || f.amount,
      );
      const hasWalkingInput = walkingList.some(
        (w) => w.startHour || w.startMinute || w.endHour || w.endMinute,
      );

      const transformedFeedingList = hasFeedingInput
        ? transformFeedingList(feedingList, recordAt)
        : [];

      const transformedWalkingList = hasWalkingInput
        ? transformWalkingList(walkingList, recordAt)
        : [];

      const body = {
        petId,
        recordAt,
        content: note,
        feedingList: transformedFeedingList,
        walkingList: transformedWalkingList,
        ...(weight.trim() !== '' && { weight: Number(weight) }),
        ...(sleepTime.trim() !== '' && { sleepTime: Number(sleepTime) }),
      };

      const onFinish = () => setTimeout(() => onSubmitting(false), 1500);

      const onSuccess = async (res: { lifeRecordId: number }) => {
        Toast.success(hasDiary ? '멍멍일지 수정 완료' : '멍멍일지 등록 완료');
        if (hasDiary) {
          await queryClient.refetchQueries({
            queryKey: ['diaryDetail', res.lifeRecordId],
          });
        }
        router.push(`/diary/${res.lifeRecordId}`);
        onFinish();
        resolve(res.lifeRecordId);
      };

      const onError = (err: unknown) => {
        Toast.error(hasDiary ? '멍멍일지 수정 실패' : '멍멍일지 등록 실패');
        onFinish();
        reject(err);
      };

      if (hasDiary && diaryData?.lifeRecordId) {
        updateMutation.mutate(
          {
            lifeRecordId: diaryData.lifeRecordId,
            data: body,
          },
          { onSuccess, onError },
        );
      } else {
        createMutation.mutate(body, { onSuccess, onError });
      }
    });
  };

  return { handleSubmit };
}
