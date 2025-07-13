import { useState } from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import ReportModal from './ReportModal';

export default function ReportDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center gap-25">
        <p className="h-25 w-xl cursor-default rounded-[20px] border p-4">
          오늘 무슨 일이 있었는지 아시나요? 말도 안되는 일이 일어났습니다 저
          사람이 나한테 욕함 정지시켜야 돼요 나의 억울함을 알아주세요
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <button className="flex cursor-pointer items-baseline gap-2">
            해당 게시물로 이동
            <Icon width="6px" height="10px" left="-234px" top="-210px" />
          </button>

          <div className="flex gap-8">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-10 w-23 pb-4 text-[16px]"
            >
              제재
            </Button>
            <Button className="h-10 w-23 pb-4 text-[16px]">철회</Button>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && <ReportModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
