export default function SingleInput({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <div className="text-base">
      <label
        className="inline-block w-[78px] text-[var(--color-primary-500)]"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        className="input-style mr-3 w-[195px] px-[18px] py-[10px] leading-[1.2]"
        id={id}
        type="text"
        placeholder={`${title}을 입력하세요`}
      />
      <span>{title === '수면시간' ? '시간' : 'kg'}</span>
    </div>
  );
}
