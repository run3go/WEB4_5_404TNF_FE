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
  const [userFilter, setUserFilter] = useState('ALL');
  const [reportFilter, setReportFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const data: UserInfo[] | ReportInfo[] =
    activeTab === 'user' ? userDummyData : reportDummyData;

  // activeTab, searchTerm, filter, currentPage, group?? 전달
  // 결과 data.res -> AdminTable에 전달
  // 결과 data.totalCount -> pagenation에 전달
  // const [data] = useGetAdminTable();

  const isDone = [
    { value: 'ALL', label: '전체' },
    { value: 'ACCEPT', label: '제재' },
    { value: 'REJECT', label: '철회' },
    { value: 'PENDING', label: '미완료' },
  ];

  const state = [
    { value: 'ALL', label: '전체' },
    { value: 'ACTIVE', label: '활성' },
    { value: 'SUSPENDED', label: '정지' },
    { value: 'WITHDRAWAL', label: '탈퇴' },
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

            {/* {activeTab === 'report' && ( */}
            {/* // 신고 처리여부 필터링 */}
            <div className="flex justify-end">
              <SelectBox
                options={activeTab === 'user' ? state : isDone}
                width="84px"
                isCenter
                value={activeTab === 'user' ? userFilter : reportFilter}
                setValue={
                  activeTab === 'user' ? setUserFilter : setReportFilter
                }
              />
            </div>
            {/* // )} */}
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
