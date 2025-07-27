'use client';
import DiaryOptionsMenu from '../diary/DiaryOptionsMenu';
import Card from './Card';
import Icon from './Icon';

export default function MobileTitle({
  title,
  onClick,
  closePage,
  showOptionsMenu = false,
  onEdit,
  onDelete,
  isSubmit,
}: {
  title: string;
  onClick?: () => void;
  closePage: () => void;
  showOptionsMenu?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isSubmit?: boolean;
}) {
  return (
    <>
      <Card className="fixed top-0 right-0 left-0 z-100 h-18 w-full rounded-none bg-[var(--color-background)] px-6 text-base sm:hidden">
        <div className="relative flex h-full items-center justify-center">
          <Icon
            className="absolute left-0 cursor-pointer"
            onClick={closePage}
            width="12px"
            height="20px"
            left="-107px"
            top="-164px"
          />
          <h1 className="leading-[1.2]">{title}</h1>
          {showOptionsMenu && onEdit && onDelete ? (
            <div className="absolute right-0 cursor-pointer">
              <DiaryOptionsMenu onEdit={onEdit} onDelete={onDelete} />
            </div>
          ) : onClick ? (
            <button
              type={isSubmit ? 'submit' : `button`}
              onClick={() => !isSubmit && onClick()}
              className="absolute right-0 cursor-pointer leading-[1.2] text-[var(--color-primary-500)]"
            >
              저장
            </button>
          ) : null}
        </div>
      </Card>
    </>
  );
}
