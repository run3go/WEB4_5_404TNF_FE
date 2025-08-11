'use client';
import Card from '../common/Card';

export default function NoteCard({ note }: { note?: DashboardNote }) {
  return (
    <div className="relative h-[200px] w-full">
      <div className="absolute h-full w-full backface-hidden">
        <Card className="h-full w-full font-medium">
          <h2 className="mb-[18px] text-xs text-[var(--color-black)] sm:text-base dark:text-[var(--color-background)]">
            관찰노트
          </h2>
          <div className="scrollbar-hidden h-[80%] overflow-y-scroll sm:px-[9px]">
            <p className="text-sm sm:text-lg">
              {note && note?.content.length > 0 ? (
                note?.content
              ) : (
                <span className="text-sm text-[var(--color-grey)] xl:text-base">
                  관찰노트 기록이 없습니다
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
