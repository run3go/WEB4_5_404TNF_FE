import Button from '../common/Button';
import Card from '../common/Card';

export default function CommentInput() {
  return (
    <>
      <div className="flex flex-col items-end gap-5">
        <Card className="h-[120px] w-[1308px] p-5">
          <textarea
            className="scrollbar-hidden h-full w-full resize-none text-[18px] font-medium text-[#2B2926] placeholder-[#909090] focus:outline-none"
            placeholder="댓글을 작성해주세요."
          />
        </Card>
        <Button className="h-[60px] w-[152px] py-5 text-center">
          등록하기
        </Button>
      </div>
    </>
  );
}
