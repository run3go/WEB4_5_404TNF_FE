import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';

export default function WalkingInput() {
  return (
    <Card className="basis-1/3">
      <div className="mb-6 flex justify-between">
        <h2>산책</h2>
        <button className="cursor-pointer">
          <Icon width="12px" height="12px" left="-194px" top="-80px" />
        </button>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <input
            className="input-style mr-2 w-13 py-1 text-center leading-[1.2]"
            type="text"
            placeholder="시간"
            maxLength={2}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-13 py-1 text-center leading-[1.2]"
            type="text"
            placeholder="분"
            maxLength={2}
          />
          <span>분</span>
        </div>
        <span>~</span>
        <div>
          <input
            className="input-style mr-2 w-13 py-1 text-center leading-[1.2]"
            type="text"
            placeholder="시간"
            maxLength={2}
          />
          <span className="mr-3">시</span>
          <input
            className="input-style mr-2 w-13 py-1 text-center leading-[1.2]"
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
