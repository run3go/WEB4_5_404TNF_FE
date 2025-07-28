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
      <div className="fixed top-[40%] left-1/2 z-1000 flex -translate-x-1/2 flex-col items-center gap-8 rounded-[20px] border border-[var(--color-primary-200)] bg-[var(--color-background)] px-[55px] pt-11 pb-8 text-sm sm:text-lg dark:bg-[var(--color-black)]">
        <span className="text-center whitespace-pre-line">{description}</span>
        <div className="flex justify-between gap-6 text-sm sm:text-base">
          <button
            className="w-[100px] cursor-pointer rounded-[50px] border border-[var(--color-grey)] py-3 text-[var(--color-grey)] transition-all hover:border-[var(--color-black)] hover:text-[var(--color-black)] sm:w-[130px] dark:hover:border-[var(--color-background)] dark:hover:text-[var(--color-background)]"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="w-[100px] cursor-pointer rounded-[50px] bg-[var(--color-primary-300)] px-4 py-3 transition-all hover:bg-[var(--color-primary-500)] sm:w-[130px] dark:text-[var(--color-black)]"
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
