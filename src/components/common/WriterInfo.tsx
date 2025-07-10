interface WriterInfo {
  name: string;
  postedAt: string;
  size?: 'small' | 'big';
}

export default function WriterInfo({
  name,
  postedAt,
  size = 'small',
}: WriterInfo) {
  const isBig = size === 'big';
  const avatarSize = isBig
    ? 'sm:w-[52px] sm:h-[52px]'
    : 'sm:w-[42px] sm:h-[42px]';
  const textSize = isBig ? 'sm:text-[16px]' : 'sm:text-[14px]';

  return (
    <>
      <div className="flex w-fit cursor-pointer items-center gap-4">
        <div className={`h-9 w-9 rounded-full bg-gray-500 ${avatarSize}`}></div>
        <div className={`font-medium sm:space-y-1`}>
          <p className={`text-[12px] ${textSize}`}>{name}</p>
          <p className={`text-[10px] text-[#909090] ${textSize}`}>{postedAt}</p>
        </div>
      </div>
    </>
  );
}
