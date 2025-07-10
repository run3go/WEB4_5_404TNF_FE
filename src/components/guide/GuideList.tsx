import Card from '../common/Card';

export default function GuideList() {
  return (
    <div className="absolute bottom-[44%] left-1/2 flex -translate-x-1/2 flex-col gap-3 text-base sm:w-140 sm:flex-row sm:flex-wrap">
      <Card className="guide-card">
        <span className="text-[var(--color-primary-500)]">5주차</span>
        <span>사회화를 배우기 전이에요!</span>
      </Card>
      <Card className="guide-card">
        <span className="text-[var(--color-primary-500)]">5주차</span>
        <span>사회화를 배우기 전이에요!</span>
      </Card>
      <Card className="guide-card">
        <span className="text-[var(--color-primary-500)]">5주차</span>
        <span>사회화를 배우기 전이에요!</span>
      </Card>
      <Card className="guide-card">
        <span className="text-[var(--color-primary-500)]">5주차</span>
        <span>사회화를 배우기 전이에요!</span>
      </Card>
    </div>
  );
}
