import { formatDate } from 'date-fns';

export default function VaccineItem({
  name,
  vaccine,
}: {
  name: string;
  vaccine: Vaccination | undefined;
}) {
  const type = vaccine
    ? vaccine.vaccineType === 'FIRST'
      ? '기초'
      : vaccine.vaccineType === 'ADDITIONAL'
        ? '추가'
        : '보충'
    : '-';
  const vaccineAt =
    vaccine && formatDate(new Date(vaccine.vaccineAt), 'yyyy. M. dd');
  return (
    <li className="flex w-full items-center py-[11px] pl-3 sm:py-3">
      <span className="basis-5/22 sm:basis-2/11">{name}</span>
      <div className="basis-5/22 pr-6 sm:basis-3/11">{type}</div>
      <div className="relative basis-4/11 pr-6">
        {vaccine ? vaccineAt : '-'}
      </div>
      <div className="flex basis-2/11 items-center pr-3">
        {vaccine ? vaccine.count : '-'}
      </div>
    </li>
  );
}
