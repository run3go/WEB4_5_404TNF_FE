import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import { useMediaQuery } from 'react-responsive';

export default function VaccineInput({ name }: { name: string }) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const types = [
    { value: 'FIRST', label: '기초' },
    { value: 'BOOSTER', label: '보충' },
    { value: 'ADDITIONAL', label: '추가' },
  ];
  if (isMobile) {
    return (
      <li className="flex w-full items-center py-[11px] pl-3 text-xs">
        <span className="basis-5/22">{name}</span>
        <div className="basis-5/22">
          <SelectBox options={types} width="full" placeholder="유형" isCenter />
        </div>
        <div className="relative basis-9/22">
          <input
            id="name"
            className="w-full"
            type="text"
            placeholder="yyyy / mm / dd"
          />
          <Icon
            className="absolute top-1/2 right-1 -translate-y-1/2 scale-60"
            width="20px"
            height="20px"
            left="-188px"
            top="-123px"
          />
        </div>
        <div className="flex basis-1/11 items-center">
          <input
            className="w-full text-center"
            type="text"
            placeholder="차수"
          />
        </div>
      </li>
    );
  } else
    return (
      <li className="flex w-full items-center pl-3">
        <span className="basis-2/11">{name}</span>
        <div className="basis-3/11 pr-6">
          <SelectBox
            options={types}
            width="full"
            hasBorder
            placeholder="유형"
          />
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
