import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';

export default function SnackInput() {
  return (
    <Card className="basis-1/3">
      <div className="mb-6 flex justify-between">
        <h2>간식</h2>
        <button className="cursor-pointer">
          <Icon width="12px" height="12px" left="-194px" top="-80px" />
        </button>
      </div>
      <input
        className="input-style w-full px-4 py-1 text-sm leading-[1.2]"
        type="text"
        placeholder="간식 종류, 개수를 입력하세요"
        maxLength={2}
      />
    </Card>
  );
}
