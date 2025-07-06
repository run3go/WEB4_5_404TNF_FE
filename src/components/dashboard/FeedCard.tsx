import circleChart from '@/assets/images/circle-chart.svg';
import Image from 'next/image';
import Card from '../common/Card';

export default function FeedCard() {
  return (
    <Card className="card__hover flex h-[322px] w-[255px] flex-col font-medium">
      <div className="mb-5 flex flex-col gap-3">
        <span>지난주 평균 식사량 (일)</span>
        <span>4 컵</span>
      </div>
      <div className="flex flex-col gap-3">
        <span>오늘의 식사기록</span>
        <span>3 컵</span>
      </div>
      <Image className="mt-1 self-center" src={circleChart} alt="원형차트" />
    </Card>
  );
}
