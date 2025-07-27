export default function Confirm({
  description,
  confirmText,
  onClose,
  onConfirm,
}: {
  description: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-202 bg-[var(--color-black)] opacity-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 z-1000 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-[20px] bg-[var(--color-background)] px-10 pt-8 pb-8 text-sm sm:top-[20%] sm:-translate-y-0 sm:gap-8 sm:px-[55px] sm:pt-11 sm:text-lg">
        <span>{description}</span>
        <div className="flex justify-between gap-6 sm:text-[15px]">
          <button
            className="w-20 cursor-pointer rounded-[50px] border border-[var(--color-grey)] py-1 text-[var(--color-grey)] transition-all hover:border-[var(--color-black)] hover:text-[var(--color-black)] sm:w-[130px] sm:py-3"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="w-20 cursor-pointer rounded-[50px] bg-[var(--color-primary-300)] py-1 transition-all hover:bg-[var(--color-primary-500)] sm:w-[130px] sm:py-3"
            type="button"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}
