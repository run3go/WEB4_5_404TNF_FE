'use client';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

/*
    options : 셀렉트 옵션 배열
    width: width 속성값
    placeholder: 플레이스 홀더
    defaultValueIndex : 디폴트 옵션
    footstep: 발자국 아이콘 유무
    isCenter: 중앙 정렬
    hasBorder: 보더 유무
*/
type Option = { value: string; label: string };

export default function SelectBox({
  value,
  setValue,
  options,
  width,
  placeholder,
  defaultValueIndex = 0,
  footstep = false,
  isCenter = false,
  hasBorder = false,
  thinBorder = false,
  borderColor = 'var(--color-primary-200)',
  type,
}: {
  value?: string;
  setValue?: (value: string) => void;
  options: Option[];
  width: string;
  placeholder?: string;
  defaultValueIndex?: number;
  footstep?: boolean;
  isCenter?: boolean;
  hasBorder?: boolean;
  thinBorder?: boolean;
  borderColor?: string;
  type?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const [fontSize, setFontSize] = useState('16px');
  useEffect(() => {
    if (!containerRef.current) return;
    const style = window.getComputedStyle(containerRef.current);
    setFontSize(style.fontSize);
  }, [setFontSize]);
  return (
    <div ref={containerRef}>
      <Select
        value={options.find((option) => option.value === value)}
        onChange={(newValue) =>
          // 모든 selectBox (value, setValue) 연결 후 setValue 조건 제거
          newValue && setValue && setValue(newValue.value)
        }
        isSearchable={false}
        options={options}
        placeholder={placeholder}
        defaultValue={options[defaultValueIndex]}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
        menuPosition="absolute"
        menuShouldBlockScroll={false}
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

                {type ? (
                  <span
                    className="block max-w-[80px] truncate"
                    title={typeof children === 'string' ? children : undefined}
                  >
                    {children}
                  </span>
                ) : (
                  children
                )}
              </div>
            </components.Option>
          ),
          DropdownIndicator: (props) => (
            <components.DropdownIndicator {...props}>
              <Icon
                className={twMerge(
                  'scale-2em absolute top-1/2 right-[18px] -translate-y-1/2',
                  fontSize === '18px' || fontSize === '20px'
                    ? 'scale-120'
                    : fontSize === '14px'
                      ? 'scale-80'
                      : fontSize === '12px'
                        ? 'scale-70'
                        : 'scale-100',
                )}
                width="12px"
                height="7px"
                left="-266px"
                top="-209px"
              />
            </components.DropdownIndicator>
          ),
        }}
        styles={{
          control: (base) => ({
            ...base,
            border: hasBorder
              ? thinBorder
                ? '1px solid rgba(43, 41, 38, 0.5)'
                : `1px solid ${borderColor}`
              : 'none',
            width,
            borderRadius: hasBorder ? '12px' : '',
            boxShadow: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            background: 'none',
            minHeight: fontSize === '14px' ? '20px' : '0',
            paddingBlock: hasBorder ? '8px' : '',
            paddingInline: hasBorder ? '1em' : '',
            '&:hover': {
              border: hasBorder
                ? thinBorder
                  ? '1px solid rgba(43, 41, 38, 0.5)'
                  : `1px solid ${borderColor}`
                : 'none',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: isDark ? 'var(--color-background)' : 'var(--color-black)',
            ...(type ? { marginRight: '15px' } : { margin: 0 }),
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '20px',
            width:
              footstep && hasBorder
                ? width
                : `${Number(width.replace('px', '')) + 20}px`,
            position: 'absolute',
            background: isDark
              ? 'var(--color-dark-background)'
              : 'var(--color-background)',
            right: 0,

            padding: fontSize === '12px' ? 0 : '0.6em',
          }),
          menuList: (base) => ({
            ...base,
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }),
          option: (base, state) => ({
            ...base,
            cursor: 'pointer',
            fontSize: '0.9em',
            color: isDark ? 'var(--color-background)' : 'var(--color-black)',
            backgroundColor: state.isSelected ? 'none' : '',
            '&:hover': {
              backgroundColor: isDark
                ? 'var(--color-primary-500)'
                : 'var(--color-primary-200)',
            },
            ...(type && {
              display: 'flex',
            }),
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          placeholder: (base) => ({
            ...base,
            color: 'var(--color-grey)',
          }),
        }}
        classNames={{
          indicatorSeparator: () => 'hidden',
          menu: () =>
            thinBorder
              ? 'border border-[rgba(43,41,38,0.5)] w-full'
              : `border border-[${borderColor}] w-full`,
          option: () => 'rounded-[8px] font-medium',
        }}
      />
    </div>
  );
}
