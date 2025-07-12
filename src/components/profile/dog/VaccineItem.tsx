export default function VaccineItem({ name }: { name: string }) {
  return (
    <li className="flex w-full items-center py-[11.3px] pl-3">
      <span className="basis-3/11 sm:basis-2/11">{name}</span>
      <div className="basis-2/11 pr-6 sm:basis-3/11">보강</div>
      <div className="relative basis-4/11 pr-6">2025. 4. 13</div>
      <div className="flex basis-2/11 items-center pr-3">-</div>
    </li>
  );
}
