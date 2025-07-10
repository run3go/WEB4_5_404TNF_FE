import Card from '../common/Card';
import BarGraph from './graph/BarGraph';

export default function WalkCard() {
  return (
    <Card className="hidden w-60 sm:block">
      <h2 className="mb-8 font-medium">산책 시간</h2>
      <BarGraph />
    </Card>
  );
}
