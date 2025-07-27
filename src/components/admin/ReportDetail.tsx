import { useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import ReportModal from './ReportModal';
import { useGetReportDetail } from '@/lib/hooks/admin/useGetReportDetail';
import Link from 'next/link';

export default function ReportDetail({ id }: { id: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<'accept' | 'reject' | 'reason'>(
    'accept',
  );
  const { data, isPending } = useGetReportDetail(id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center gap-25">
        <p className="h-25 w-xl cursor-default rounded-[20px] border px-4 py-2">
          {data?.reason}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          {data?.status !== 'ACCEPT' && (
            <Link
              href={`/post/${data?.boardType}/${data?.articleId}`}
              className="flex cursor-pointer items-baseline gap-2"
            >
              해당 게시물로 이동
              <Icon width="6px" height="10px" left="-234px" top="-210px" />
            </Link>
          )}

          <div className="flex gap-8">
            {data?.status === 'PENDING' ? (
              <>
                <Button
                  onClick={() => {
                    setResult('accept');
                    setIsModalOpen(true);
                  }}
                  className="h-10 w-23 pb-4 text-[16px]"
                >
                  제재
                </Button>
                <Button
                  onClick={() => {
                    setResult('reject');
                    setIsModalOpen(true);
                  }}
                  className="h-10 w-23 pb-4 text-[16px]"
                >
                  철회
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setResult('reason');
                  setIsModalOpen(true);
                }}
                className="h-10 w-23 pb-4 text-[16px]"
              >
                사유 확인
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <ReportModal
          id={id}
          result={result}
          status={data?.status ?? ''}
          reportedUser={data?.reportedNickname ?? ''}
          user={{
            state: data?.reportedState ?? '',
            suspendedAt: data?.suspendedAt ?? '',
            offsetdatetime: data?.offsetdatetime ?? '',
          }}
          adminReason={data?.adminReason ?? ''}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
