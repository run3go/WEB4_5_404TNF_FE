import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';

export default function VaccineInput({ name }: { name: string }) {
  const types = [
    { value: 'FIRST', label: '기초' },
    { value: 'BOOSTER', label: '보충' },
    { value: 'ADDITIONAL', label: '추가' },
  ];
  return (
    <li className="flex w-full items-center pl-3">
      <span className="basis-3/11 sm:basis-2/11">{name}</span>
      <div className="basis-2/11 pr-6 sm:basis-3/11">
        <SelectBox options={types} width="full" hasBorder placeholder="유형" />
      </div>
      <div className="relative basis-4/11 pr-6">
        <input
          id="name"
          className="profile-input-style w-full"
          type="text"
          placeholder="yyyy / mm / dd"
        />
        <Icon
          className="absolute top-1/2 right-10 -translate-y-1/2 scale-80"
          width="20px"
          height="20px"
          left="-188px"
          top="-123px"
        />
      </div>
      <div className="flex basis-2/11 items-center pr-3">
        <input
          className="profile-input-style mr-4 w-full text-center"
          type="text"
        />
        차
      </div>
    </li>
  );
}
