import DiaryCard from '../DiaryCard';
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Note({ value, onChange }: Props) {
  return (
    <DiaryCard className="h-full" title="관찰노트">
      <textarea
        className="scrollbar-hidden h-30 w-full resize-none px-1 py-1 focus:outline-none sm:h-full"
        placeholder="댕댕이의 하루를 관찰하여 내용을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </DiaryCard>
  );
}
