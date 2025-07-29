import { twMerge } from 'tailwind-merge';

export default function SingleInput({
  title,
  id,
  value,
  onChange,
}: {
  title: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={twMerge(
        'text-sm sm:text-base',
        id === 'weight' && 'mt-1 mb-3 sm:mb-5',
      )}
    >
      <label
        className="inline-block w-[78px] text-[var(--color-primary-500)]"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        className="input-style mr-3 w-[195px] px-[18px] py-[10px] text-center leading-[1.1] sm:leading-[1.2]"
        id={id}
        type="text"
        placeholder={`${title}을 입력하세요`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>{title === '수면시간' ? '시간' : 'kg'}</span>
    </div>
  );
}
