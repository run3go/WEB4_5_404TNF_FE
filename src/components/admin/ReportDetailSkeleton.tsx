export default function ReportDetailSkeleton() {
  return (
    <>
      <div className="flex animate-pulse justify-center gap-25">
        <div className="h-25 w-xl rounded-[20px] bg-gray-300 dark:bg-[var(--color-grey)]"></div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-6 w-[133px] rounded bg-gray-300 dark:bg-[var(--color-grey)]"></div>

          <div className="flex gap-8">
            <div className="h-10 w-23 rounded-[50px] bg-gray-300 dark:bg-[var(--color-grey)]"></div>
            <div className="h-10 w-23 rounded-[50px] bg-gray-300 dark:bg-[var(--color-grey)]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
