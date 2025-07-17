import DateInput from '@/components/common/DateInput';
import SelectBox from '@/components/common/SelectBox';
import { Controller, useFormContext } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';

export default function VaccineInput({
  name,
  eng,
}: {
  name: string;
  eng: string;
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const { control, register } = useFormContext();

  const types = [
    { value: 'FIRST', label: '기초' },
    { value: 'BOOSTER', label: '보충' },
    { value: 'ADDITIONAL', label: '추가' },
  ];

  if (isMobile) {
    return (
      <li className="flex w-full items-center py-[9px] pl-3 text-xs">
        <span className="basis-5/22">{name}</span>
        <div className="basis-5/22 pl-[4px]">
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
        <span className="basis-2/11">{name}</span>
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
