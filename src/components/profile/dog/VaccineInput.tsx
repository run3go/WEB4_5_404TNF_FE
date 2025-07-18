import DateInput from '@/components/common/DateInput';
import Icon from '@/components/common/Icon';
import SelectBox from '@/components/common/SelectBox';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import VaccineInfo from './VaccineInfo';

export default function VaccineInput({
  name,
  eng,
}: {
  name: string;
  eng: VaccineName;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const { control, register } = useFormContext();

  const types = [
    { value: 'FIRST', label: '기초' },
    { value: 'BOOSTER', label: '보강' },
    { value: 'ADDITIONAL', label: '추가' },
  ];

  const infoRef = useRef<HTMLDivElement>(null);
  const [isVaccineInfoOepn, setIsVaccineInfoOepn] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setIsVaccineInfoOepn(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <li className="flex w-full items-center py-[9px] pl-3 text-xs">
        <div className="flex basis-6/22 gap-1">
          {name}
          <div className="relative" onClick={() => setIsVaccineInfoOepn(true)}>
            <Icon
              className="scale-80 cursor-pointer"
              width="18px"
              height="18px"
              left="-377px"
              top="-257px"
            />
            {isVaccineInfoOepn && <VaccineInfo ref={infoRef} eng={eng} />}
          </div>
        </div>
        <div className="basis-5/22">
          <Controller
            name={`${eng}.vaccineType`}
            control={control}
            render={({ field }) => (
              <SelectBox
                value={field.value}
                setValue={(newValue) => field.onChange(newValue)}
                options={types}
                width="full"
                placeholder="유형"
                isCenter
              />
            )}
          />
        </div>
        <div className="relative basis-9/22">
          <Controller
            name={`${eng}.vaccineAt`}
            control={control}
            render={({ field }) => (
              <DateInput
                className="w-full rounded-[12px] p-0 pl-[6px]"
                selected={field.value}
                setSelected={(date) => field.onChange(date)}
                disableFuture
                showAllDate
                placeholder="yyyy.mm.dd"
              />
            )}
          />
        </div>
        <div className="flex basis-2/11 items-center px-2">
          <input
            className="w-full text-center leading-[1.2]"
            type="number"
            placeholder="차수"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 1) {
                target.value = target.value.slice(0, 1);
              }
            }}
            {...register(`${eng}.count`)}
          />
        </div>
      </li>
    );
  } else
    return (
      <li className="flex w-full items-center pl-3">
        <div className="flex basis-2/11 gap-2">
          {name}
          <div
            className="relative"
            onMouseEnter={() => setIsVaccineInfoOepn(true)}
            onMouseLeave={() => setIsVaccineInfoOepn(false)}
          >
            <Icon
              className="cursor-pointer"
              width="18px"
              height="18px"
              left="-377px"
              top="-257px"
            />
            {isVaccineInfoOepn && <VaccineInfo eng={eng} />}
          </div>
        </div>

        <div className="basis-3/11 pr-6">
          <Controller
            name={`${eng}.vaccineType`}
            control={control}
            render={({ field }) => (
              <SelectBox
                value={field.value}
                setValue={(newValue) => field.onChange(newValue)}
                options={types}
                width="full"
                hasBorder
                placeholder="유형"
                isCenter
              />
            )}
          />
        </div>
        <div className="relative basis-4/11 pr-6">
          <Controller
            name={`${eng}.vaccineAt`}
            control={control}
            render={({ field }) => (
              <DateInput
                className="w-full rounded-[12px] border-1 border-[var(--color-primary-300)] pl-[21px]"
                selected={field.value}
                setSelected={(date) => field.onChange(date)}
                disableFuture
                showAllDate
                placeholder="yyyy.mm.dd"
                placeholderClassName="text-[var(--color-grey)]"
              />
            )}
          />
        </div>
        <div className="flex basis-2/11 items-center pr-3">
          <input
            className="profile-input-style mr-4 w-full text-center"
            type="number"
            placeholder="차수"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 1) {
                target.value = target.value.slice(0, 1);
              }
            }}
            {...register(`${eng}.count`)}
          />
          차
        </div>
      </li>
    );
}
