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
  const avatarSize = isBig ? 'w-[52px] h-[52px]' : 'w-[42px] h-[42px]';
  const textSize = isBig ? 'text-[16px] space-y-1' : 'text-[14px]';

  return (
    <>
      <div className="flex w-fit cursor-pointer items-center gap-4">
        <div className={`rounded-full bg-gray-500 ${avatarSize}`}></div>
        <div className={`font-medium ${textSize}`}>
          <p>{name}</p>
          <p className="text-[#909090]">{postedAt}</p>
        </div>
      </div>
    </>
  );
}
