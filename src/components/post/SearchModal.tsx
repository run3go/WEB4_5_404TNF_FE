import { useEffect } from 'react';
import Icon from '../common/Icon';
import SelectBox from '../common/SelectBox';

const SEARCH_LIST = [
  { value: '제목 + 내용', label: '제목 + 내용' },
  { value: '제목', label: '제목' },
  { value: '내용', label: '내용' },
  { value: '작성자', label: '작성자' },
];

export default function SearchModal({ onClose }: { onClose: () => void }) {
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
          className="absolute top-1/2 left-1/2 w-[90%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] bg-white p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex h-[48px] items-center rounded-[50px]">
            <SelectBox width={125} options={SEARCH_LIST} />
            <input
              className="h-[16px] w-full pr-6 focus:outline-none"
              placeholder="검색어를 입력해주세요"
            />
            <Icon
              width="18px"
              height="18px"
              left="-263px"
              top="-124px"
              className="absolute right-0 scale-90 cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
