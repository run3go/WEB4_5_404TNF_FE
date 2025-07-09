import Card from '@/components/common/Card';

export default function Note() {
  return (
    <Card className="flex h-71 w-full flex-col border border-[var(--color-primary-500)] sm:h-full">
      <h2 className="border-b border-[var(--color-primary-500)] pb-3 leading-[1.2] font-extrabold text-[var(--color-primary-500)] sm:text-base">
        관찰노트
      </h2>
      <textarea
        className="w-full resize-none px-2 py-3"
        placeholder="댕댕이의 하루를 관찰하여 내용을 입력해주세요"
      />
    </Card>
  );
}
