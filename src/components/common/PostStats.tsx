import Icon from './Icon';

interface PostStats {
  comment: number;
  like: number;
  views: number;
}

export default function PostStats({ comment, like, views }: PostStats) {
  return (
    <>
      <div className="flex gap-2 font-medium sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Icon
            width="16px"
            height="16px"
            left="-105px"
            top="-207px"
            className="mt-0.5 scale-75 sm:scale-100"
          />
          <p className="pt-1 text-[10px] sm:pt-[2px] sm:text-[14px]">
            {comment}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Icon
            width="16px"
            height="16px"
            left="-26px"
            top="-207px"
            className="mt-0.5 scale-75 sm:scale-100"
          />
          <p className="pt-1 text-[10px] sm:pt-[2px] sm:text-[14px]">{like}</p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Icon
            width="16px"
            height="16px"
            left="-186px"
            top="-167px"
            className="mt-0.5 scale-75 sm:scale-100"
          />
          <p className="pt-1 text-[10px] sm:pt-[2px] sm:text-[14px]">{views}</p>
        </div>
      </div>
    </>
  );
}
