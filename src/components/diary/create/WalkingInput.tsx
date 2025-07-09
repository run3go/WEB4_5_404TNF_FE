import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';

export default function WalkingInput() {
  return (
    <Card className="h-71 grow border border-[var(--color-primary-500)]">
      <div className="flex items-center justify-between border-b border-[var(--color-primary-500)] pb-3">
        <h2 className="leading-[1.2] font-extrabold text-[var(--color-primary-500)] sm:text-base">
          산책
        </h2>
        <Icon
          className="cursor-pointer"
          width="12px"
          height="12px"
          left="-262px"
          top="-259px"
        />
      </div>
      <div className="mt-5 flex justify-between text-xs sm:text-sm">
        <div>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="시간"
            maxLength={2}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
          />
          <span>분</span>
        </div>
        <span>~</span>
        <div>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="시간"
            maxLength={2}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-11 py-1 text-center leading-[1.2] sm:w-13"
            type="text"
            placeholder="분"
            maxLength={2}
          />
          <span>분</span>
        </div>
      </div>
    </Card>
  );
}
