import { useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import ReportModal from './ReportModal';
import { useGetReportDetail } from '@/lib/hooks/admin/useGetReportDetail';
import Link from 'next/link';

export default function ReportDetail({ id }: { id: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<'accept' | 'reject'>('accept');
  const { data } = useGetReportDetail(id);

  return (
    <>
      <div className="flex justify-center gap-25">
        <p className="h-25 w-xl cursor-default rounded-[20px] border p-4">
          {data?.reason}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href={`/post/${data?.boardName}/${data?.articleId}`}
            className="flex cursor-pointer items-baseline gap-2"
          >
            해당 게시물로 이동
            <Icon width="6px" height="10px" left="-234px" top="-210px" />
          </Link>

          <div className="flex gap-8">
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
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <ReportModal
          id={id}
          result={result}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
