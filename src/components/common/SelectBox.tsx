'use client';
import Select, { components } from 'react-select';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

/*
    options : 셀렉트 옵션 배열
    width: 가로 길이
    placeholder: 플레이스 홀더
    defaultValueIndex : 디폴트 옵션
    footstep: 발자국 아이콘 유무
    isCenter: 중앙 정렬
    hasBorder: 보더 유무
*/
export default function SelectBox({
  options,
  width,
  placeholder,
  defaultValueIndex = 0,
  footstep = false,
  isCenter = false,
  hasBorder = false,
}: {
  options: { value: string; label: string }[];
  width: number;
  placeholder?: string;
  defaultValueIndex?: number;
  footstep?: boolean;
  isCenter?: boolean;
  hasBorder?: boolean;
}) {
  return (
    <Select
      isSearchable={false}
      options={options}
      placeholder={placeholder}
      defaultValue={placeholder ? 'none' : options[defaultValueIndex]}
      components={{
        Option: ({ children, ...rest }) => (
          <components.Option {...rest}>
            <div
              className={twMerge(
                'flex items-center gap-2',
                isCenter && 'justify-center',
              )}
            >
              {footstep && (
                <Icon width="16px" height="14px" left="-26px" top="-79px" />
              )}
              {children}
            </div>
          </components.Option>
        ),
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <Icon
              className="absolute top-1/2 right-[18px] -translate-y-1/2"
              width="16px"
              height="10px"
              left="-230px"
              top="-126px"
            />
          </components.DropdownIndicator>
        ),
      }}
      styles={{
        control: (base) => ({
          ...base,
          border: hasBorder ? '3px solid var(--color-primary-200)' : 'none',
          width: `${width}px`,
          borderRadius: hasBorder ? '12px' : '',
          boxShadow: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          paddingBlock: hasBorder ? '8px' : '',
          paddingInline: hasBorder ? '20px' : '',
          '&:hover': {
            border: hasBorder ? '3px solid var(--color-primary-200)' : 'none',
          },
        }),
        menu: (base) => ({
          ...base,
          borderRadius: '20px',
          width: footstep && !hasBorder ? `${width + 20}px` : `${width}px`,
          position: 'absolute',
          right: 0,
        }),
        option: (base, state) => ({
          ...base,
          cursor: 'pointer',
          fontSize: '14px',
          color: 'var(--color-black)',
          backgroundColor: state.isSelected ? 'none' : '',
          '&:hover': {
            backgroundColor: 'var(--color-primary-200)',
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: 'var(--color-black)',
        }),
      }}
      classNames={{
        indicatorSeparator: () => 'hidden',
        menu: () => 'p-3 border-3 border-[var(--color-primary-200)]',
        option: () => 'rounded-[8px] font-medium',
      }}
    />
  );
}
