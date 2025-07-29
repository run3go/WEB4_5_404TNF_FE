import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import { Controller, useForm } from 'react-hook-form';
import { useAcceptReport } from '@/lib/hooks/admin/useAcceptReport';
import { useEffect } from 'react';
import { useRejectReport } from '@/lib/hooks/admin/useRejectReport';
import {
  modalHeight,
  periodData,
  userState,
  userStateColor,
} from '@/assets/data/admin';

type FormData = {
  period: string;
  reason: string;
};

export default function ReportModal({
  id,
  result,
  status,
  reportedUser,
  user,
  adminReason,
  onClose,
}: {
  id: number;
  result: 'accept' | 'reject' | 'reason';
  status: string;
  reportedUser: string;
  user: { state: string; reportedAt: string; suspensionEndAt: string };
  adminReason: string;
  onClose: () => void;
}) {
  const { mutate: acceptReport } = useAcceptReport();
  const { mutate: rejectReport } = useRejectReport();

  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      period: periodData[0].value,
      reason: '',
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    if (result === 'reason') {
      setValue('reason', adminReason);
    }
  }, [result, adminReason, setValue]);

  const onSubmit = (data: FormData) => {
    if (result === 'accept') {
      acceptReport({
        reportId: id,
        period: data.period,
        adminReason: data.reason,
      });
    } else if (result === 'reject') {
      rejectReport({
        reportId: id,
        adminReason: data.reason,
      });
    }

    onClose();
  };

  // const period = watch('period');

  const heightByResult = modalHeight[result] || 'h-[440px]';

  const reasonLable =
    status === 'ACCEPT' || result === 'accept'
      ? '제재 사유'
      : status === 'REJECT' || result === 'reject'
        ? '철회 사유'
        : null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-1000 flex items-center justify-center bg-[var(--color-black)]/50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative ${heightByResult} w-[586px] cursor-default rounded-[30px] bg-[var(--color-background)] px-12 py-10 text-base`}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer"
          >
            <Icon width="16px" height="16px" left="-302px" top="-202px" />
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-8 flex justify-center text-xl font-bold">
              {result === 'reason'
                ? '처리 내역 확인'
                : `신고 내역 처리 - ${result === 'accept' ? '제재' : '철회'}`}
            </h1>
            <div className="mb-4 flex gap-9">
              <h3>대상자</h3>
              <h3>{reportedUser}</h3>
            </div>
            {result !== 'reason' && (
              <div className="mb-4 flex gap-13">
                <h3>상태</h3>
                <div className={`${userStateColor[user.state]} flex gap-3`}>
                  <h3>{userState[user.state]}</h3>
                  {user.state === 'SUSPENDED' && (
                    <h3>
                      ({user.reportedAt} ~ {user.suspensionEndAt})
                    </h3>
                  )}
                </div>
              </div>
            )}

            {result === 'accept' && (
              <div className="mb-4 flex gap-5">
                <h3>제재 기간</h3>
                <Controller
                  control={control}
                  name="period"
                  render={({ field }) => (
                    <SelectBox
                      options={periodData}
                      width="70px"
                      isCenter
                      value={field.value}
                      setValue={field.onChange}
                    />
                  )}
                />
              </div>
            )}

            <div className="relative">
              <h3 className="mb-2">{reasonLable}</h3>
              <p className="absolute top-2 right-0 mr-2 mb-2 h-4 justify-self-end text-[14px] text-[var(--color-red)]">
                {errors.reason?.message}
              </p>
              <textarea
                {...register('reason', { required: '사유는 필수입니다.' })}
                readOnly={result === 'reason'}
                placeholder="사유를 입력해주세요."
                className={`${result === 'reason' ? 'cursor-default' : ''} h-27 w-full resize-none rounded-[20px] border px-4 py-2 focus:outline-none`}
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
