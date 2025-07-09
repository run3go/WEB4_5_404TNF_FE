import Icon from './Icon';

interface PostStats {
  comment: string;
  like: string;
  views: string;
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
            className="scale-75"
          />
          <p className="text-[10px] sm:text-[14px]">{comment}</p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Icon
            width="16px"
            height="16px"
            left="-26px"
            top="-207px"
            className="scale-75"
          />
          <p className="text-[10px] sm:text-[14px]">{like}</p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Icon
            width="16px"
            height="16px"
            left="-186px"
            top="-167px"
            className="scale-75"
          />
          <p className="text-[10px] sm:text-[14px]">{views}</p>
        </div>
      </div>
    </>
  );
}
