export default function VaccineItem({ name }: { name: string }) {
  return (
    <li className="flex w-full items-center py-[11px] pl-3 sm:py-3">
      <span className="basis-5/22 sm:basis-2/11">{name}</span>
      <div className="basis-5/22 pr-6 sm:basis-3/11">보강</div>
      <div className="relative basis-4/11 pr-6">2025. 4. 13</div>
      <div className="flex basis-2/11 items-center pr-3">-</div>
    </li>
  );
}
