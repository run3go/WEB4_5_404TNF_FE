import { useGetTransition } from '@/lib/hooks/admin/useGetTransition';
import Card from '../common/Card';
import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';
import { getMonth, getYear, subMonths, subYears } from 'date-fns';
import { useGetArticles } from '@/lib/hooks/admin/useGetArticles';

export default function StatusGraph({
  option,
  unit,
}: {
  option: 'user' | 'post';
  unit: string;
}) {
  const { data: transition } = useGetTransition(unit);
  const { data: articles } = useGetArticles(unit);

  const transitionChartData =
    unit === 'MONTH'
      ? transition?.map((item) => ({
          label: String(item.month),
          value1: item.joinedCount,
          value2: item.leaveCount,
        }))
      : transition?.map((item) => ({
          label: String(item.year),
          value1: item.joinedCount,
          value2: item.leaveCount,
        }));

  const articleChartData =
    unit === 'MONTH'
      ? articles?.map((item) => ({
          label: String(item.month),
          value: item.articlesCount,
        }))
      : articles?.map((item) => ({
          label: String(item.year),
          value: item.articlesCount,
        }));

  const now = new Date();

  const months = Array.from({ length: 5 }, (_, i) => {
    const targetDate = subMonths(now, 4 - i);
    const monthNumber = getMonth(targetDate) + 1;
    return `${monthNumber}월`;
  });

  const years = Array.from({ length: 5 }, (_, i) => {
    const targetDate = subYears(now, 4 - i);
    const yearNumber = getYear(targetDate);
    return `${yearNumber}년`;
  });

  return (
    <>
      <div className="flex cursor-default flex-col gap-4 text-[18px]">
        {option === 'user' ? (
          <>
            <h1>신규 가입 / 탈퇴 추이</h1>
            <div>
              <Card className="w-175 sm:px-10 sm:py-4">
                <GroupedBarChart data={transitionChartData} />
              </Card>
              <div
                className={`mt-4 flex justify-center text-[18px] ${unit === 'MONTH' ? 'gap-25' : 'gap-17'}`}
              >
                {unit === 'MONTH'
                  ? months.map((m) => <p key={m}>{m}</p>)
                  : years.map((y) => <p key={y}>{y}</p>)}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>게시글 작성 추이</h1>
            <div>
              <Card className="w-175 sm:px-16 sm:py-4">
                <BarChart data={articleChartData} />
              </Card>
              <div
                className={`mt-4 flex justify-center text-[18px] ${unit === 'MONTH' ? 'gap-25' : 'gap-17'}`}
              >
                {unit === 'MONTH'
                  ? months.map((m) => <p key={m}>{m}</p>)
                  : years.map((y) => <p key={y}>{y}</p>)}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
