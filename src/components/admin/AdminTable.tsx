import React, { useState } from 'react';
import Icon from '../common/Icon';
import SortArrow from './SortArrow';
import ReportDetail from './ReportDetail';

export default function AdminTable({
  type,
  data,
}: {
  type: 'user' | 'report';
  data: User[] | Reports[];
}) {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  // const status = '활성';

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getSortedData = () => {
    if (!sortKey) return data;

    const sorted = [...(data as Array<User | Reports>)].sort((a, b) => {
      const valueA = a[sortKey as keyof (User | Reports)];
      const valueB = b[sortKey as keyof (User | Reports)];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // 숫자 or 문자열 정렬
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // 날짜 문자열 정렬 (yyyy.MM.dd or ISO)
      if (
        typeof valueA === 'string' &&
        typeof valueB === 'string' &&
        /^\d{4}[\.-]\d{2}[\.-]\d{2}$/.test(valueA)
      ) {
        const aDate = new Date(valueA);
        const bDate = new Date(valueB);
        return sortOrder === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      // 기본: 문자열 정렬
      return sortOrder === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    return sorted;
  };

  return (
    <>
      <table>
        <thead>
          {type === 'user' ? (
            <tr className="h-10 border-b border-[var(--color-black)]">
              <th className="w-15 cursor-default">No</th>
              <th onClick={() => handleSort('email')} className="w-80">
                <div className="admin-th-div">
                  이메일
                  <SortArrow active={sortKey === 'email'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('nickname')} className="w-55">
                <div className="admin-th-div">
                  닉네임
                  <SortArrow
                    active={sortKey === 'nickname'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('postCount')} className="w-25">
                <div className="admin-th-div justify-center">
                  게시글
                  <SortArrow
                    active={sortKey === 'postCount'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('commentCount')} className="w-25">
                <div className="admin-th-div justify-center">
                  댓글
                  <SortArrow
                    active={sortKey === 'commentCount'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('lastLogin')} className="w-46">
                <div className="admin-th-div">
                  최근 접속일
                  <SortArrow
                    active={sortKey === 'lastLogin'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('createdAt')} className="w-46">
                <div className="admin-th-div">
                  가입일
                  <SortArrow
                    active={sortKey === 'createdAt'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('status')} className="w-28.5">
                <div className="admin-th-div justify-center">
                  상태
                  <SortArrow active={sortKey === 'status'} order={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('statusChangedAt')}
                className="w-46"
              >
                <div className="admin-th-div">
                  정지 종료일
                  <SortArrow
                    active={sortKey === 'statusChangedAt'}
                    order={sortOrder}
                  />
                </div>
              </th>
            </tr>
          ) : (
            <tr className="h-10 border-b border-[var(--color-black)]">
              <th className="w-15 cursor-default">No</th>
              <th onClick={() => handleSort('reporter')} className="w-55">
                <div className="admin-th-div">
                  신고자
                  <SortArrow
                    active={sortKey === 'reporter'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('targetType')} className="w-34">
                <div className="admin-th-div">
                  컨텐츠
                  <SortArrow
                    active={sortKey === 'targetType'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('reportedUser')} className="w-55">
                <div className="admin-th-div">
                  대상자
                  <SortArrow
                    active={sortKey === 'reportedUser'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('reportDate')} className="w-46">
                <div className="admin-th-div">
                  접수일
                  <SortArrow
                    active={sortKey === 'reportDate'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('reason')} className="w-34">
                <div className="admin-th-div">
                  사유
                  <SortArrow active={sortKey === 'reason'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('isDone')} className="w-34.5">
                <div className="admin-th-div justify-center">
                  처리여부
                  <SortArrow active={sortKey === 'isDone'} order={sortOrder} />
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {type === 'user' &&
            (getSortedData() as User[]).map((user, i) => (
              <tr
                key={user.id}
                className="h-10 cursor-default border-b border-[var(--color-black)]"
              >
                <td className="text-center">{i + 1}</td>
                <td>{user.email}</td>
                <td>{user.nickname}</td>
                <td className="text-center">{user.postCount}</td>
                <td className="text-center">{user.commentCount}</td>
                <td>{user.lastLogin}</td>
                <td>{user.createdAt}</td>
                <td
                  className={`text-center ${user.status === '활성' ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}
                >
                  {user.status}
                </td>
                <td>{user.statusChangedAt}</td>
              </tr>
            ))}

          {type === 'report' &&
            (getSortedData() as Reports[]).map((report, i) => (
              <React.Fragment key={report.id}>
                <tr
                  // key={report.id}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="h-10 cursor-pointer border-b border-[var(--color-black)]"
                >
                  <td className="text-center">{i + 1}</td>
                  <td>{report.reporter}</td>
                  <td>{report.targetType}</td>
                  <td>{report.reportedUser}</td>
                  <td>{report.reportDate}</td>
                  <td>{report.reason}</td>
                  <td>
                    <div className="flex justify-center">
                      {report.isDone && (
                        <Icon
                          width="22px"
                          height="22px"
                          left="-101px"
                          top="-255px"
                        />
                      )}
                    </div>
                  </td>
                </tr>

                {openIndex === i && (
                  <tr>
                    <td colSpan={7} className="py-2.5">
                      <ReportDetail />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </>
  );
}
