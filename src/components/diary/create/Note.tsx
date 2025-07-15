import DiaryCard from '../DiaryCard';

export default function Note() {
  return (
    <DiaryCard className="h-full" title="관찰노트">
      <textarea
        className="scrollbar-hidden h-full w-full resize-none px-2 focus:outline-0"
        placeholder="댕댕이의 하루를 관찰하여 내용을 입력해주세요"
      />
    </DiaryCard>
  );
}
