import Card from '@/components/common/Card';

export default function DiaryCardSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col gap-3 border-1 border-[var(--color-primary-500)]">
      <div className="mb-2 flex items-center justify-between border-b border-[var(--color-primary-500)] pb-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-gray-300" />
          <div className="h-4 w-20 rounded bg-gray-300" />
        </div>
        <div className="h-4 w-16 rounded bg-gray-300" />
      </div>
      <div className="flex gap-2">
        <div className="inline-block h-4 w-[78px] rounded bg-gray-300" />
        <div className="h-4 w-12 rounded bg-gray-300" />
      </div>
      <div className="flex gap-2">
        <div className="inline-block h-4 w-[78px] rounded bg-gray-300" />
        <div className="h-4 w-24 rounded bg-gray-300" />
      </div>
      <div>
        <div className="mb-2 h-4 w-20 rounded bg-gray-300" />
        <div className="mb-1 h-4 w-full rounded bg-gray-300" />
        <div className="h-4 w-3/4 rounded bg-gray-300" />
      </div>
    </Card>
  );
}
