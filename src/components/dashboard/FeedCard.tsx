import Card from '../common/Card';

export default function FeedCard() {
  return (
    <Card className="h-[322px] w-[255px] font-medium">
      <div className="mb-8 flex flex-col gap-4">
        <span>지난주 평균 식사량 (일)</span>
        <span>4 컵</span>
      </div>
      <div className="flex flex-col gap-4">
        <span>오늘의 식사기록</span>
        <span>3 컵</span>
      </div>
    </Card>
  );
}
