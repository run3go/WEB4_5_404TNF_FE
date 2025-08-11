export default function Tooltip({ title }: { title: string }) {
  return (
    <div
      className={`absolute top-1/2 left-full ml-2 -translate-y-1/2 rounded-lg border border-[var(--color-primary-300)] bg-[var(--color-background)] px-3 py-1 text-sm whitespace-nowrap text-[var(--color-primary-500)] opacity-0 shadow-lg transition-opacity duration-200 ease-in-out group-hover:opacity-100 md:block xl:hidden`}
    >
      {title}
    </div>
  );
}
