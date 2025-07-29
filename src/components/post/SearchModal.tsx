import { useEffect } from 'react';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';
import { SEARCH_LIST } from '@/assets/data/post';

export default function SearchModal({
  onClose,
  setSearchType,
  keyword,
  setKeyword,
  onSearch,
}: {
  onClose: () => void;
  setSearchType: (value: string) => void;
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-[#2B2926]/50 sm:hidden"
        onClick={onClose}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[90%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] bg-white p-4 dark:bg-[#343434]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex h-[48px] items-center rounded-[50px]">
            <SelectBox
              width="125px"
              options={SEARCH_LIST}
              isCenter
              setValue={setSearchType}
            />
            <input
              className="h-[16px] w-full pr-6 focus:outline-none"
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onClose();
                  onSearch();
                  setKeyword('');
                }
              }}
            />
            <Icon
              width="18px"
              height="18px"
              left="-263px"
              top="-124px"
              className="absolute right-0 scale-90 cursor-pointer"
              onClick={() => {
                onClose();
                onSearch();
                setKeyword('');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
