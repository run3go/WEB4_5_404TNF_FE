import Icon from './Icon';

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-end gap-7 pr-[100px]">
        <Icon
          width="28px"
          height="28px"
          left="-304px"
          top="-18px"
          className="cursor-pointer"
        />
        <div className="h-9 w-9 cursor-pointer rounded-full bg-black"></div>
      </div>
    </>
  );
}
