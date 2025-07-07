import Card from '@/components/common/Card';

export default function Note() {
  return (
    <Card className="flex h-[270px] w-full flex-col">
      <h2 className="mb-4">관찰노트</h2>
      <textarea
        className="input-style w-full grow-1 resize-none p-5"
        placeholder="댕댕이의 하루를 관찰하여 내용을 입력해주세요"
      />
    </Card>
  );
}
