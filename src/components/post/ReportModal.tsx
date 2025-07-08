import Button from '../common/Button';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';

const CATEGORY = [
  { value: '카테고리1', label: '카테고리1' },
  { value: '카테고리2', label: '카테고리2' },
  { value: '카테고리3', label: '카테고리3' },
];

export default function ReportModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-[625px] w-[720px] rounded-[20px] bg-[#FFFDF7] p-8">
      <div className="flex items-center justify-end gap-[275px]">
        <p className="text-[18px] font-bold">신고하기</p>
        <Icon
          width="12px"
          height="12px"
          left="-72px"
          top="-126px"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="mt-[40px] space-y-[28px] pl-[68px]">
        <div className="flex items-center gap-[42px] text-[18px] font-medium">
          <p>대상자</p>
          <p>유저6</p>
        </div>

        <div className="flex items-center gap-6 text-[18px] font-medium">
          <p>카테고리</p>
          <SelectBox
            options={CATEGORY}
            width={433}
            isCenter={true}
            hasBorder={true}
            thinBorder={true}
          />
        </div>

        <div className="text-[18px] font-medium">
          <label className="shrink-0" htmlFor="content">
            신고사유
          </label>
          <textarea
            id="content"
            className="scrollbar-hidden mt-[17px] h-[220px] w-[524px] resize-none overflow-y-auto rounded-[12px] border border-[#2B2926]/50 p-4 pl-[18px] placeholder:text-[#909090] focus:outline-none"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-8 flex h-[62px] w-[156px] items-center justify-center">
          신고하기
        </Button>
      </div>
    </div>
  );
}
