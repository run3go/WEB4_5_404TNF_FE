import Icon from './Icon';
import SelectBox from './SelectBox';

export default function SearchBar({
  options,
  value,
  onChange,
  onSearch,
}: {
  options?: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}) {
  return (
    <>
      <div className="bg-opacity-100 relative hidden h-[40px] items-center rounded-[10px] border-[3px] border-[#FFDBAB] sm:flex">
        <div className="pl-4">
          {options && <SelectBox width={'120px'} options={options} isCenter />}
        </div>
        <input
          className="h-[40px] w-[250px] focus:outline-none"
          placeholder="검색어를 입력해주세요"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearch) {
              onSearch();
            }
          }}
        />
        <Icon
          width="18px"
          height="18px"
          left="-263px"
          top="-124px"
          className="absolute right-3 cursor-pointer"
          onClick={onSearch}
        />
      </div>
    </>
  );
}
