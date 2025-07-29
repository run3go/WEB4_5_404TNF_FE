'use client';

import { useState } from 'react';
import AdminTable from './AdminTable';
import Pagenation from './Pagination';
import SearchBar from '../common/SearchBar';
import SelectBox from '../common/SelectBox';
// import { reportDummyData, userDummyData } from '@/assets/data/admin';
import { useGetUserList } from '@/lib/hooks/admin/useGetUserList';
import { useGetReportList } from '@/lib/hooks/admin/useGetReportList';
import { isDone, state } from '@/assets/data/admin';
// import { useGetAdminTable } from '@/lib/hooks/admin/useGetAdminTable';

export default function AdminTableContainer() {
  const [activeTab, setActiveTab] = useState<'user' | 'report'>('user');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('ALL');
  const [reportFilter, setReportFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [userSort, setUserSort] = useState<'ASC' | 'DESC'>('ASC');
  const [reportSort, setReportSort] = useState<'ASC' | 'DESC'>('ASC');
  const [userSortBy, setUserSortBy] = useState('JOIN_DATE');
  const [reportSortBy, setReportSortBy] = useState('REPORTED_AT');
  const [search, setSearch] = useState('');

  // const data: UserInfo[] | ReportInfo[] =
  //   activeTab === 'user' ? userDummyData : reportDummyData;

  // activeTab, searchTerm, filter, currentPage, group?? 전달
  // 결과 data.res -> AdminTable에 전달
  // 결과 data.totalCount -> pagenation에 전달
  const { data: userData } = useGetUserList({
    page: currentPage,
    search: search,
    sort: userSort,
    sortBy: userSortBy,
    status: userFilter,
  });

  const { data: reportData } = useGetReportList({
    page: currentPage,
    search: search,
    sort: reportSort,
    sortBy: reportSortBy,
    status: reportFilter,
  });

  const data =
    activeTab === 'user'
      ? (userData?.users ?? [])
      : (reportData?.reports ?? []);
  const pageInfo =
    activeTab === 'user'
      ? (userData?.pageInfo ?? {})
      : (reportData?.pageInfo ?? {});

  const handleSearch = () => {
    console.log('검색어: ', searchTerm);

    setSearch(searchTerm.trim());
  };

  return (
    <>
      {/* List 메뉴 */}
      <div className="mt-15 flex justify-center gap-10 text-[20px]">
        <h1
          onClick={() => {
            setActiveTab('user');
            setCurrentPage(1);
            setSearchTerm('');
            setSearch('');
            setUserFilter('ALL');
            setUserSort('ASC');
            setUserSortBy('JOIN_DATE');
          }}
          className={`cursor-pointer ${
            activeTab === 'user'
              ? `text-[var(--color-primary-500)] underline underline-offset-[12px]`
              : ''
          }`}
        >
          회원관리
        </h1>
        <h1
          onClick={() => {
            setActiveTab('report');
            setCurrentPage(1);
            setSearchTerm('');
            setSearch('');
            setReportFilter('ALL');
            setReportSort('ASC');
            setReportSortBy('REPORTED_AT');
          }}
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
          </div>

          {/* 목록(List) */}
          <AdminTable
            type={activeTab}
            data={data}
            sort={activeTab === 'user' ? userSort : reportSort}
            sortBy={activeTab === 'user' ? userSortBy : reportSortBy}
            onSortChange={(newSort) => {
              if (activeTab === 'user') {
                setUserSort(newSort);
              } else {
                setReportSort(newSort);
              }
            }}
            onSortByChange={(newSortBy) => {
              if (activeTab === 'user') {
                setUserSortBy(newSortBy);
              } else {
                setReportSortBy(newSortBy);
              }
            }}
            currentPage={currentPage}
          />
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagenation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageInfo={pageInfo}
      />
      {/* <Pagenation currentPage={currentPage} totalCount={} onPageChange={setCurrentPage} /> */}
    </>
  );
}
