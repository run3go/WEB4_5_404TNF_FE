'use client';

import { useState } from 'react';
import SearchModal from './SearchModal';
import Icon from '../common/Icon';

export default function SearchButton({
  setSearchType,
  keyword,
  setKeyword,
  onSearch,
}: {
  setSearchType: (value: string) => void;
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        width="18px"
        height="18px"
        left="-263px"
        top="-124px"
        className="block scale-90 cursor-pointer sm:hidden"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SearchModal
          setSearchType={setSearchType}
          keyword={keyword}
          onSearch={onSearch}
          setKeyword={setKeyword}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
