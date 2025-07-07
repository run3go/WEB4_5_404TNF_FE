interface WriterInfo {
  name: string;
  postedAt: string;
}

export default function WriterInfo({ name, postedAt }: WriterInfo) {
  return (
    <>
      <div className="flex w-fit cursor-pointer items-center gap-4">
        <div className="h-[42px] w-[42px] rounded-full bg-gray-500"></div>
        <div className="text-[14px] font-medium">
          <p>{name}</p>
          <p className="text-[#909090]">{postedAt}</p>
        </div>
      </div>
    </>
  );
}
