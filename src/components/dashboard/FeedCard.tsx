import { feedUnit } from '@/assets/data/pet';
import Card from '../common/Card';
import DonutGraph from './graph/DonutGraph';

export default function FeedCard({ feeding }: { feeding?: DashboardFeeding }) {
  if (!feeding) {
    return <></>;
  }

  const unitLabel = feedUnit
    .filter((unit) => unit.value === feeding.unit)
    .map((unit) => unit.label);

  return (
    <Card className="flex w-full max-w-[255px] flex-col text-sm font-medium sm:text-base">
      <div className="mb-5 flex flex-col gap-2">
        <span className="text-xs sm:text-base">지난주 평균 식사량 (일)</span>
        <span>
          {feeding.average} {unitLabel}
        </span>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <span className="text-xs sm:text-base">오늘의 식사기록</span>
        <span>
          {feeding.amount} {unitLabel}
        </span>
      </div>
      <DonutGraph feeding={feeding} />
    </Card>
  );
}
