'use client';

import { useState } from 'react';
import SearchModal from './SearchModal';
import Icon from '../common/Icon';

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        width="18px"
        height="18px"
        left="-263px"
        top="-124px"
        className="absolute right-3 mr-4 block scale-90 cursor-pointer sm:hidden"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && <SearchModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
