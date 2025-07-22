import { useMutation } from '@tanstack/react-query';
import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import MobileReportModal from './MobileReportModal';
import { report } from '@/api/post';
import { useAuthStore } from '@/stores/authStoe';
import { useState } from 'react';

const CATEGORY = [
  { value: 'ABUSE', label: '부적절한 언행' },
  { value: 'SPAM', label: '도배 및 광고' },
  { value: 'FRAUD', label: '사기 행위' },
  { value: 'ADULT_CONTENT', label: '선정적 콘텐츠' },
];

export default function ReportModal({
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
      alert('신고 성공');
    },
  });

  const handleReport = () => {
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
    <>
      <div className="hidden h-[625px] w-[720px] rounded-[20px] bg-[#FFFDF7] p-8 sm:block">
        <div className="flex items-center justify-end gap-[275px]">
          <p className="text-[18px] font-bold">신고하기</p>
          <Icon
            width="12px"
            height="12px"
            left="-72px"
            top="-126px"
            className="cursor-pointer"
            onClick={() => {
              onClose();
              setReason('');
            }}
          />
        </div>
        <div className="mt-[40px] space-y-[28px] pl-[68px]">
          <div className="flex items-center gap-[42px] text-[18px] font-medium">
            <p>대상자</p>
            <p>{reportedName}</p>
          </div>

          <div className="flex items-center gap-6 text-[18px] font-medium">
            <p>카테고리</p>
            <SelectBox
              options={CATEGORY}
              width="433px"
              isCenter={true}
              hasBorder={true}
              thinBorder={true}
              setValue={setReportCategory}
            />
          </div>

          <div className="flex flex-col gap-6 text-[18px] font-medium">
            <label className="shrink-0" htmlFor="content">
              신고사유
            </label>
            <textarea
              id="content"
              className="scrollbar-hidden h-[220px] w-[523px] resize-none overflow-y-auto rounded-[12px] border border-[#2B2926]/50 p-4 pl-[18px] placeholder:text-[#909090] focus:outline-none"
              placeholder="내용을 입력해주세요"
              value={reason}
              onChange={(e) => setReason(e.target.value.trim())}
            />
          </div>
        </div>
        <div className="flex justify-center" onClick={handleReport}>
          <Button
            className="mt-8 flex h-[62px] w-[156px] items-center justify-center disabled:bg-[#2B2926]/20 disabled:text-[#909090]"
            disabled={reason.length === 0}
          >
            신고하기
          </Button>
        </div>
      </div>
      <div className="sm:hidden">
        <MobileReportModal onClose={onClose} />
      </div>
    </>
  );
}
