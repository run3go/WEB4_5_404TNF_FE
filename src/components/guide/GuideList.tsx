import Card from '../common/Card';

export default function GuideList({
  guides,
}: {
  guides: { week: number; title: string; url: string }[];
}) {
  return (
    <>
      {guides.map((guide) => (
        <Card
          key={guide.week}
          className="guide-card"
          onClick={() => window.open(guide.url)}
        >
          <span className="text-[var(--color-primary-500)]">
            {guide.week}주차
          </span>
          <span>{guide.title}</span>
        </Card>
      ))}
    </>
  );
}
