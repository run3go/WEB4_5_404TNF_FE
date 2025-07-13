import Button from '../common/Button';
import Icon from '../common/Icon';

export default function ReportModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-1000 flex items-center justify-center bg-[var(--color-black)]/50"
      >
        <div className="relative h-[467px] w-[586px] cursor-default rounded-[30px] bg-[var(--color-background)] px-12 py-10 text-base">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <Icon width="16px" height="16px" left="-302px" top="-202px" />
          </button>
          <h1 className="mb-10 flex justify-center text-xl font-bold">
            신고 내역 처리
          </h1>
          <div className="mb-4 flex gap-9">
            <h3>대상자</h3>
            <h3>유저6</h3>
          </div>
          <div className="mb-4 flex gap-13">
            <h3>상태</h3>
            <h3 className="text-[var(--color-green)]">활성</h3>
          </div>
          <div>
            <h3 className="mb-4">처리 사유</h3>
            <textarea
              className="h-27 w-full resize-none rounded-[20px] border p-2 focus:outline-none"
              placeholder="사유를 입력해주세요."
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Button className="h-[41px] w-[94px] pb-4 text-base">확인</Button>
          </div>
        </div>
      </div>
    </>
  );
}
