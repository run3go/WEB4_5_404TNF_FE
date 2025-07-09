import Button from '../common/Button';
import Icon from '../common/Icon';
import EditImageList from './EditImageList';

export default function MobilePostCreate() {
  return (
    <>
      <div className="min-h-screen w-screen min-w-[375px] bg-[var(--color-background)]">
        <div className="flex flex-none justify-center gap-[15px] pt-5 pb-3">
          <Button className="board__btn">
            <Icon
              width="20px"
              height="20px"
              left="-27px"
              top="-165px"
              className="scale-60"
            />
            <p className="text-[10px] sm:text-[18px]">질문게시판</p>
          </Button>
          <Button className="board__btn">
            <Icon
              width="20px"
              height="20px"
              left="-67px"
              top="-166px"
              className="scale-60"
            />
            <p className="text-[10px]">자유게시판</p>
          </Button>
        </div>

        <input
          className="h-[44px] w-full border-b border-b-[#2B2926]/50 p-4 pr-6 text-[12px] font-medium focus:outline-none"
          placeholder="제목 입력"
        />
        <textarea
          className="min-h-[300px] w-full resize-none overflow-hidden border-b border-b-[#2B2926]/50 p-4 text-[12px] font-medium focus:outline-none"
          placeholder="내용 입력"
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
        <div className="flex items-end gap-2 px-4">
          <div className="flex h-[80px] w-[80px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] bg-[#E1E1E1]">
            <Icon width="22px" height="22px" left="-301px" top="-121px" />
            <p className="text-[16px] font-medium">5 / 5</p>
          </div>
          <div className="min-w-[254px]">
            <EditImageList />
          </div>
        </div>
        <button className="mt-[152px] h-[60px] w-full bg-[#FCC389] text-[14px] font-medium text-[#2B2926]">
          저장하기
        </button>
      </div>
    </>
  );
}
