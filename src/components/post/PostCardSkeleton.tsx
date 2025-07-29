import Card from '../common/Card';

export default function PostCardSkeleton() {
  return (
    <Card className="mx-1 flex h-[192px] animate-pulse items-center justify-between gap-4 p-4 sm:h-[228px] sm:flex-row dark:bg-[var(--color-black)]">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="aspect-square w-9 rounded-full bg-gray-300 sm:w-[42px] dark:bg-[#909090]" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 rounded bg-gray-300 dark:bg-[#909090]" />
            <div className="h-3 w-28 rounded bg-gray-300 dark:bg-[#909090]" />
          </div>
        </div>
        <div className="h-3 w-3/4 rounded bg-gray-300 sm:h-5 dark:bg-[#909090]" />
        <div className="flex flex-col gap-2">
          <div className="h-2 w-5/6 rounded bg-gray-300 sm:h-4 dark:bg-[#909090]" />
          <div className="h-2 w-5/6 rounded bg-gray-300 sm:h-4 dark:bg-[#909090]" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-[23px] w-12 rounded bg-gray-300 dark:bg-[#909090]" />
          <div className="h-[23px] w-12 rounded bg-gray-300 dark:bg-[#909090]" />
          <div className="h-[23px] w-12 rounded bg-gray-300 dark:bg-[#909090]" />
        </div>
      </div>
      <div className="aspect-square w-20 rounded-2xl bg-gray-300 sm:w-[188px] dark:bg-[#909090]" />
    </Card>
  );
}
