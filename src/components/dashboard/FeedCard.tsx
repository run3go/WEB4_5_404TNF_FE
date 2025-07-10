import Card from '../common/Card';
import DonutGraph from './graph/DonutGraph';

export default function FeedCard() {
  return (
    <Card className="flex w-full max-w-[255px] flex-col text-sm font-medium sm:text-base">
      <div className="mb-5 flex flex-col gap-2">
        <span className="text-xs sm:text-base">지난주 평균 식사량 (일)</span>
        <span>4 컵</span>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <span className="text-xs sm:text-base">오늘의 식사기록</span>
        <span>3 컵</span>
      </div>
      <DonutGraph />
    </Card>
  );
}
