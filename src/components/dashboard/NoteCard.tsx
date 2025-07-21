'use client';
import Card from '../common/Card';

export default function NoteCard({ note }: { note?: DashboardNote }) {
  return (
    <div className="relative h-40 w-full max-w-[558px] sm:h-[200px]">
      <div className="absolute h-full w-full backface-hidden">
        <Card className="h-full w-full max-w-[560px] font-medium">
          <h2 className="mb-[18px] text-xs text-[var(--color-grey)] sm:text-base sm:text-[var(--color-black)]">
            관찰노트
          </h2>
          <p className="text-sm sm:p-[9px] sm:text-lg">
            {note?.content ?? '관찰노트 기록이 없습니다'}
          </p>
        </Card>
      </div>
    </div>
  );
}
