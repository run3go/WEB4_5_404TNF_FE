'use client';

import { REPORT_LIST } from '@/assets/data/post';
import Button from '../common/Button';
import SelectBox from '../common/SelectBox';
import MobileTitle from '@/components/common/MobileTitle';
import { useAuthStore } from '@/stores/authStoe';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { report } from '@/api/post';
import { Toast } from '../common/Toast';

export default function MobileReportModal({
  reportedName,
  reportedId,
  reportType,
  contentId,
  onClose,
}: {
  reportedName: string;
  reportedId: number;
  reportType: 'BOARD' | 'REPLY';
  contentId: number;
  onClose: () => void;
}) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [reportCategory, setReportCategory] = useState('ABUSE');
  const [reason, setReason] = useState('');

  const reportMutation = useMutation({
    mutationFn: report,
    onSuccess: () => {
      onClose();
      setReason('');
      Toast.success('신고에 성공했습니다.');
    },
    onError: (error) => {
      onClose();
      if (error instanceof Error) {
        Toast.error(error.message);
      } else {
        Toast.error('신고 중 오류가 발생했습니다.');
      }
    },
  });

  const handleReport = () => {
    if (reportMutation.isPending) return;
    if (reason.trim() === '') return;
    reportMutation.mutate({
      reporterId: userInfo!.userId,
      reportedId,
      reportType,
      contentId,
      reportCategory,
      reason,
    });
  };
  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-[#FFFDF7] p-4 dark:bg-[#2B2926]">
      <MobileTitle
        title="신고하기"
        closePage={() => {
          onClose();
          setReason('');
        }}
      />

      <div className="mt-6 flex flex-col gap-5 text-[14px] font-medium">
        <div className="flex items-center gap-4">
          <p className="w-20 shrink-0">대상자</p>
          <p>{reportedName}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="w-20 shrink-0">카테고리</p>
          <div className="w-full">
            <SelectBox
              options={REPORT_LIST}
              width="full"
              isCenter={true}
              hasBorder={true}
              thinBorder={true}
              setValue={setReportCategory}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="mb-4">
            신고사유
          </label>
          <textarea
            id="content"
            className="scrollbar-hidden min-h-[200px] w-full resize-none overflow-y-auto rounded-[12px] border border-[#2B2926]/50 p-3 placeholder:text-[#909090] focus:outline-none dark:border-[#FFFDF7]/50"
            placeholder="내용을 입력해주세요"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center" onClick={handleReport}>
        <Button
          className="h-[48px] w-[140px] text-[14px] disabled:bg-[#2B2926]/20 disabled:text-[#909090]"
          disabled={reason.trim().length === 0}
        >
          신고하기
        </Button>
      </div>
    </div>
  );
}
