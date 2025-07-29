'use client';
import AdminTableContainer from '@/components/admin/AdminTableContainer';
import StatusGraph from '@/components/admin/StatusGraph';
import SelectBox from '@/components/common/SelectBox';
import { useGetTotalUsers } from '@/lib/hooks/admin/useGetTotalUsers';
import { useState } from 'react';

export default function AdminClient() {
  const period = [
    { value: 'MONTH', label: '월간' },
    { value: 'YEAR', label: '연간' },
  ];

  const { data: total } = useGetTotalUsers();

  const [unit, setUnit] = useState('MONTH');

  return (
    <>
      {/* 가입자 수 */}
      <div className="flex cursor-default justify-center gap-10 text-[28px]">
        <h1>가입자 수</h1>
        <h1 className="mr-14 font-bold">{total} 명</h1>
      </div>

      {/* 그래프 기간 선택(월간 / 연간) */}
      <div className="my-5 flex justify-end text-[18px]">
        <SelectBox
          options={period}
          width="70px"
          isCenter
          value={unit}
          setValue={setUnit}
        />
      </div>

      {/* 신규 가입/탈퇴 추이 그래프, 게시글 작성 추이 그래프 */}
      <div className="flex justify-center gap-12">
        <StatusGraph option="user" unit={unit} />
        <StatusGraph option="post" unit={unit} />
      </div>

      {/* 관리자 보드 */}
      <AdminTableContainer />
    </>
  );
}
