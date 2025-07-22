'use client';

import { useState } from 'react';
import AdminTable from './AdminTable';
import Pagenation from './Pagination';
import SearchBar from '../common/SearchBar';
import SelectBox from '../common/SelectBox';
import { reportDummyData, userDummyData } from '@/assets/data/admin';
// import { useGetAdminTable } from '@/lib/hooks/admin/useGetAdminTable';

export default function AdminTableContainer() {
  const [activeTab, setActiveTab] = useState<'user' | 'report'>('user');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const data: UserInfo[] | ReportInfo[] =
    activeTab === 'user' ? userDummyData : reportDummyData;

  // activeTab, searchTerm, filter, currentPage, group?? 전달
  // 결과 data.res -> AdminTable에 전달
  // 결과 data.totalCount -> pagenation에 전달
  // const [data] = useGetAdminTable();

  const isDone = [
    { value: 'all', label: '전체' },
    { value: 'complete', label: '처리 완료' },
    { value: 'incomplete', label: '미완료' },
  ];

  const handleSearch = () => {
    console.log('검색어: ', searchTerm);
  };

  return (
    <>
      {/* List 메뉴 */}
      <div className="mt-15 flex justify-center gap-10 text-[20px]">
        <h1
          onClick={() => setActiveTab('user')}
          className={`cursor-pointer ${
            activeTab === 'user'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          회원관리
        </h1>
        <h1
          onClick={() => setActiveTab('report')}
          className={`cursor-pointer ${
            activeTab === 'report'
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
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
              />
            </div>

            {activeTab === 'report' && (
              // 신고 처리여부 필터링
              <div className="flex justify-end">
                <SelectBox
                  options={isDone}
                  width="105px"
                  isCenter
                  value={filter}
                  setValue={setFilter}
                />
              </div>
            )}
          </div>

          {/* 목록(List) */}
          <AdminTable type={activeTab} data={data} />
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagenation currentPage={currentPage} onPageChange={setCurrentPage} />
      {/* <Pagenation currentPage={currentPage} totalCount={} onPageChange={setCurrentPage} /> */}
    </>
  );
}
