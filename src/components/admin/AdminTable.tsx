import React, { useState } from 'react';
// import Icon from '../common/Icon';
import SortArrow from './SortArrow';
import ReportDetail from './ReportDetail';
import {
  reportReason,
  reportState,
  reportStateColor,
  reportType,
  userState,
  userStateColor,
} from '@/assets/data/admin';
import { format } from 'date-fns';
import Button from '../common/Button';
import { useChangeUserState } from '@/lib/hooks/admin/useChangeUserState';
import Confirm from '../common/Confirm';

export default function AdminTable({
  type,
  data,
  sort,
  sortBy,
  onSortChange,
  onSortByChange,
  currentPage,
}: AdminTableProps) {
  // const [sortKey, setSortKey] = useState('');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  // const status = '활성';

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState<{
    description: string;
    confirmText: string;
    onConfirm: () => void;
  } | null>(null);
  const { mutate: changeState } = useChangeUserState();

  const handleSort = (key: string) => {
    let nextOrder: 'ASC' | 'DESC' = 'DESC';
    if (sortBy === key) {
      nextOrder = sort === 'ASC' ? 'DESC' : 'ASC';
    }
    onSortChange(nextOrder);
    onSortByChange(key);
  };

  const handleActive = (userId: number) => {
    setConfirmOptions({
      description: '해당 유저를 활성상태로 변경하시겠습니까?',
      confirmText: '확인',
      onConfirm: () => changeState(userId),
    });
    setShowConfirm(true);

    // const res = confirm('해당 유저를 활성상태로 변경하시겠습니까?');

    // if (res) {
    //   changeState(userId);
    // }
  };

  return (
    <>
      <table>
        <thead>
          {type === 'user' ? (
            <tr className="h-10 border-b border-[var(--color-black)] dark:border-[var(--color-background)]">
              <th className="w-15 cursor-default">No</th>
              <th onClick={() => handleSort('EMAIL')} className="w-80">
                <div className="admin-th-div">
                  이메일
                  <SortArrow active={sortBy === 'EMAIL'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('NICKNAME')} className="w-50">
                <div className="admin-th-div">
                  닉네임
                  <SortArrow active={sortBy === 'NICKNAME'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('POST_COUNT')} className="w-25">
                <div className="admin-th-div justify-center">
                  게시글
                  <SortArrow active={sortBy === 'POST_COUNT'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('COMMENT_COUNT')} className="w-25">
                <div className="admin-th-div justify-center">
                  댓글
                  <SortArrow active={sortBy === 'COMMENT_COUNT'} order={sort} />
                </div>
              </th>
              <th
                onClick={() => handleSort('LAST_LOGIN_DATE')}
                className="w-40"
              >
                <div className="admin-th-div">
                  최근 접속일
                  <SortArrow
                    active={sortBy === 'LAST_LOGIN_DATE'}
                    order={sort}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('JOIN_DATE')} className="w-40">
                <div className="admin-th-div">
                  가입일
                  <SortArrow active={sortBy === 'JOIN_DATE'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('STATE')} className="w-28.5">
                <div className="admin-th-div justify-center">
                  상태
                  <SortArrow active={sortBy === 'STATE'} order={sort} />
                </div>
              </th>
              <th
                onClick={() => handleSort('SUSPENSION_END_DATE')}
                className="w-40"
              >
                <div className="admin-th-div">
                  정지 종료일
                  <SortArrow
                    active={sortBy === 'SUSPENSION_END_DATE'}
                    order={sort}
                  />
                </div>
              </th>
              <th className="w-30">상태 변경</th>
            </tr>
          ) : (
            <tr className="h-10 border-b border-[var(--color-black)] dark:border-[var(--color-background)]">
              <th className="w-15 cursor-default">No</th>
              <th
                onClick={() => handleSort('REPORTER_NICKNAME')}
                className="w-55"
              >
                <div className="admin-th-div">
                  신고자
                  <SortArrow
                    active={sortBy === 'REPORTER_NICKNAME'}
                    order={sort}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('CONTENT_TYPE')} className="w-34">
                <div className="admin-th-div">
                  컨텐츠
                  <SortArrow active={sortBy === 'CONTENT_TYPE'} order={sort} />
                </div>
              </th>
              <th
                onClick={() => handleSort('REPORTED_NICKNAME ')}
                className="w-55"
              >
                <div className="admin-th-div">
                  대상자
                  <SortArrow
                    active={sortBy === 'REPORTED_NICKNAME '}
                    order={sort}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('REPORTED_AT')} className="w-46">
                <div className="admin-th-div">
                  접수일
                  <SortArrow active={sortBy === 'REPORTED_AT'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('REASON')} className="w-34">
                <div className="admin-th-div">
                  사유
                  <SortArrow active={sortBy === 'REASON'} order={sort} />
                </div>
              </th>
              <th onClick={() => handleSort('STATUS')} className="w-34.5">
                <div className="admin-th-div justify-center">
                  처리여부
                  <SortArrow active={sortBy === 'STATUS'} order={sort} />
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {type === 'user' &&
            ((data as UserInfo[]).length > 0 ? (
              (data as UserInfo[]).map((user, i) => (
                <tr
                  key={user.userId}
                  className="h-10 cursor-default border-b border-[var(--color-black)] dark:border-[var(--color-background)]"
                >
                  <td className="text-center">
                    {i + 1 + (currentPage - 1) * 10}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td className="text-center">{user.postCount}</td>
                  <td className="text-center">{user.commentCount}</td>
                  <td>
                    {user.lastLoginDate
                      ? format(new Date(user.lastLoginDate), 'yyyy.MM.dd')
                      : ''}
                  </td>
                  <td>{format(new Date(user.joinDate), 'yyyy.MM.dd')}</td>
                  <td className={`text-center ${userStateColor[user.status]}`}>
                    {userState[user.status]}
                  </td>
                  <td>
                    {user.suspensionEndAt
                      ? format(new Date(user.suspensionEndAt), 'yyyy.MM.dd')
                      : ''}
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      {user.status === 'SUSPENDED' && (
                        <Button
                          onClick={() => handleActive(user.userId)}
                          className="h-7 w-15 p-0 text-[14px]"
                        >
                          활성화
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 text-center text-[var(--color-grey)]"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ))}

          {type === 'report' &&
            ((data as ReportInfo[]).length > 0 ? (
              (data as ReportInfo[]).map((report, i) => (
                <React.Fragment key={report.reportId}>
                  <tr
                    // key={report.id}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="h-10 cursor-pointer border-b border-[var(--color-black)] dark:border-[var(--color-background)]"
                  >
                    <td className="text-center">
                      {i + 1 + (currentPage - 1) * 10}
                    </td>
                    <td>{report.reporter}</td>
                    <td>{reportType[report.type]}</td>
                    <td>{report.reported}</td>
                    <td>{format(new Date(report.createdAt), 'yyyy.MM.dd')}</td>
                    <td>{reportReason[report.category]}</td>
                    <td>
                      <div
                        className={`flex justify-center ${reportStateColor[report.status]}`}
                      >
                        {/* {report.isDone && (
                        <Icon
                          width="22px"
                          height="22px"
                          left="-101px"
                          top="-255px"
                        />
                      )} */}
                        {reportState[report.status]}
                      </div>
                    </td>
                  </tr>

                  {openIndex === i && (
                    <tr>
                      <td colSpan={7} className="py-2.5">
                        <ReportDetail id={report.reportId} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-4 text-center text-[var(--color-grey)]"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showConfirm && confirmOptions && (
        <Confirm
          description={confirmOptions.description}
          confirmText="확인"
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            confirmOptions.onConfirm();
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
