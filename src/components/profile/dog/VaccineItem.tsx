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
        ? '보강'
        : '추가'
    : '-';
  const vaccineAt =
    vaccine && formatDate(new Date(vaccine.vaccineAt), 'yyyy. MM. dd');
  return (
    <li className="flex w-full items-center py-[11px] pl-3 sm:py-3">
      <span className="basis-5/22 sm:basis-2/11">{name}</span>
      <div className="basis-5/22 pl-[8px] sm:basis-3/11 sm:pr-6 sm:pl-[12.5px] sm:text-start">
        <span className="inline-block w-[22px] text-center sm:w-[27px]">
          {type}
        </span>
      </div>
      <div className="relative basis-3/11 sm:basis-4/11 sm:pl-[14.5px]">
        <span className="inline-block w-[96px]">
          {vaccine ? vaccineAt : '-'}
        </span>
      </div>
      <div className="basis-2/11 pr-3 text-center leading-[1.2] min-[360px]:pl-[8px] min-[500px]:pl-[40px] sm:pl-[14.5px] sm:text-start">
        {vaccine ? vaccine.count : '-'}
      </div>
    </li>
  );
}
