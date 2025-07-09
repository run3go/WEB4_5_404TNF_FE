import Button from '../common/Button';
import Card from '../common/Card';

export default function CommentInput() {
  return (
    <>
      <div className="hidden flex-col items-end gap-5 sm:flex">
        <Card className="min-h-[120px] w-[1308px] p-5">
          <textarea
            className="h-full w-full resize-none text-[18px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
            placeholder="댓글을 작성해주세요."
          />
        </Card>
        <Button className="flex h-[60px] w-[152px] items-center justify-center">
          등록하기
        </Button>
      </div>

      <div className="sm:hidden">
        <textarea
          className="h-[52px] w-full resize-none rounded-t-[20px] bg-[#FFECD2] px-5 py-[14px] text-[12px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          placeholder="댓글을 남겨주세요"
        />
      </div>
    </>
  );
}
