import Card from '../common/Card';

export default function NoteCard() {
  return (
    <Card className="card__hover aspect-[560/210] w-full max-w-[560px] font-medium">
      <h2 className="mb-[18px] text-xs text-[var(--color-grey)] sm:text-base sm:text-[var(--color-black)]">
        관찰노트
      </h2>
      <p className="text-sm sm:p-[9px] sm:text-xl">
        더워서 걸을 때 좀 힘들어함 그거 빼고는 괜찮아 보였음 <br />
        밥을 좀 적게 먹음 간식을 많이 먹여서 그런듯 <br />
        낮잠 자는 시간이 늘어난 것 같음
      </p>
    </Card>
  );
}
