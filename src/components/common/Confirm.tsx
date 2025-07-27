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
      <div className="fixed top-[20%] left-1/2 z-1000 flex -translate-x-1/2 flex-col items-center gap-8 rounded-[20px] bg-[var(--color-background)] px-[55px] pt-11 pb-8 text-lg">
        <span>{description}</span>
        <div className="flex justify-between gap-6 text-[15px]">
          <button
            className="w-[130px] cursor-pointer rounded-[50px] border border-[var(--color-grey)] text-[var(--color-grey)] transition-all hover:border-[var(--color-black)] hover:text-[var(--color-black)]"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="w-[130px] cursor-pointer rounded-[50px] bg-[var(--color-primary-300)] px-4 py-2 transition-all hover:bg-[var(--color-primary-500)]"
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
