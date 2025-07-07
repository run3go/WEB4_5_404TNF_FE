export default function SingleInput({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  return (
    <div>
      <label className="inline-block w-[102px]" htmlFor={id}>
        {title}
      </label>
      <input
        className="input-style mr-3 w-[195px] px-[18px] py-3 text-base"
        id={id}
        type="text"
        placeholder={`${title}을 입력하세요`}
      />
      <span>{title === '수면시간' ? '시간' : 'kg'}</span>
    </div>
  );
}
