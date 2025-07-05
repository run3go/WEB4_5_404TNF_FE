import Card from '../common/Card';

export default function LineGraphCard({ title }: { title: string }) {
  return (
    <Card className="flex h-[210px] w-[558px] justify-between">
      <h2 className="font-medium">{title}</h2>
    </Card>
  );
}
