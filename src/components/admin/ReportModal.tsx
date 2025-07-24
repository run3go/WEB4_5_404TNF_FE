import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import { useForm } from 'react-hook-form';
import { useAcceptReport } from '@/lib/hooks/admin/useAcceptReport';
import { useEffect } from 'react';
import { useRejectReport } from '@/lib/hooks/admin/useRejectReport';

type FormData = {
  period: string;
  reason: string;
};

export default function ReportModal({
  id,
  result,
  onClose,
}: {
  id: number;
  result: 'accept' | 'reject';
  onClose: () => void;
}) {
  const periodData = [
    { value: '1day', label: '1일' },
    { value: '2day', label: '2일' },
    { value: '3day', label: '3일' },
    { value: '5day', label: '5일' },
    { value: '7day', label: '7일' },
    { value: '2week', label: '2주' },
    { value: '1month', label: '1달' },
    { value: '3month', label: '3달' },
    { value: '1year', label: '1년' },
    { value: 'permanent', label: '영구' },
  ];

  const { mutate: acceptReport } = useAcceptReport();
  const { mutate: rejectReport } = useRejectReport();

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      period: periodData[0].value,
      reason: '',
    },
  });

  useEffect(() => {
    if (result === 'reject') {
      unregister('period');
    }
  }, [result, unregister]);

  const onSubmit = (data: FormData) => {
    if (result === 'accept') {
      acceptReport({
        reportId: id,
        period: data.period,
        adminReason: data.reason,
      });
    } else {
      rejectReport({
        reportId: id,
        adminReason: data.reason,
      });
    }

    // console.log(data.period, data.reason);

    onClose();
  };

  const period = watch('period');

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-1000 flex items-center justify-center bg-[var(--color-black)]/50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative ${result === 'accept' ? 'h-[495px]' : 'h-[455px]'} w-[586px] cursor-default rounded-[30px] bg-[var(--color-background)] px-12 py-10 text-base`}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer"
          >
            <Icon width="16px" height="16px" left="-302px" top="-202px" />
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-8 flex justify-center text-xl font-bold">
              신고 내역 처리 - {result === 'accept' ? '제재' : '철회'}
            </h1>
            <div className="mb-4 flex gap-9">
              <h3>대상자</h3>
              <h3>유저6</h3>
            </div>
            <div className="mb-4 flex gap-13">
              <h3>상태</h3>
              <h3 className="text-[var(--color-green)]">활성</h3>
            </div>

            {result === 'accept' && (
              <div className="mb-4 flex gap-5">
                <h3>제재 기간</h3>
                <SelectBox
                  options={periodData}
                  width="70px"
                  isCenter
                  value={period}
                  setValue={(val) => setValue('period', val)}
                />
              </div>
            )}

            <div>
              <h3 className="mb-0">
                {result === 'accept' ? '제재 사유' : '철회 사유'}
              </h3>
              <p className="mr-2 mb-2 h-4 justify-self-end text-[14px] text-[var(--color-red)]">
                {errors.reason?.message ?? ''}
              </p>
              <textarea
                {...register('reason', { required: '사유는 필수입니다.' })}
                className="h-27 w-full resize-none rounded-[20px] border p-2 focus:outline-none"
                placeholder="사유를 입력해주세요."
              />
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                className="h-[41px] w-[94px] pb-4 text-base"
              >
                확인
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
