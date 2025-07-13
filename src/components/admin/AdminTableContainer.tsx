'use client';

import { useState } from 'react';
import AdminTable from './AdminTable';
import Pagenation from './Pagination';
import SearchBar from '../common/SearchBar';
import SelectBox from '../common/SelectBox';

export default function AdminTableContainer() {
  const [active, setActive] = useState('user');

  const isDone = [
    { value: 'all', label: '전체' },
    { value: 'complete', label: '처리 완료' },
    { value: 'incomplete', label: '미완료' },
  ];

  return (
    <>
      {/* List 메뉴 */}
      <div className="mt-15 flex justify-center gap-20 text-2xl">
        <h1
          onClick={() => setActive('user')}
          className={`cursor-pointer ${
            active === 'user'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          회원관리
        </h1>
        <h1
          onClick={() => setActive('report')}
          className={`cursor-pointer ${
            active === 'report'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          신고내역
        </h1>
      </div>

      <div className="mt-10 flex justify-center">
        <div>
          <div className="mb-6 flex items-center justify-between">
            {/* List 검색 */}
            <div className="w-76">
              <SearchBar />
            </div>

            {active === 'report' && (
              // 신고 처리여부 필터링
              <div className="flex justify-end">
                <SelectBox options={isDone} width="105px" isCenter />
              </div>
            )}
          </div>

          {/* 목록(List) */}
          <AdminTable type={active} />
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagenation />
    </>
  );
}
