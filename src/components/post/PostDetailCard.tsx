import { useAuthStore } from '@/stores/authStoe';
import Card from '../common/Card';
import MeatballsMenu from '../common/MeatballsMenu';
import PostStats from '../common/PostStats';
import WriterInfo from '../common/WriterInfo';
import ImageList from './ImageList';

interface PostDetailCardProps {
  postDetail: PostDeatail;
  onReportClick: () => void;
  onEditClick: () => void;
  onRemoveClick: () => void;
}

export default function PostDetailCard({
  postDetail,
  onReportClick,
  onEditClick,
  onRemoveClick,
}: PostDetailCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);
  return (
    <>
      <Card className="m-6 w-[calc(100vw-48px)] p-4 sm:m-0 sm:w-full sm:p-8">
        <div className="flex items-center justify-between">
          <WriterInfo
            authorId={postDetail.userId}
            name={postDetail.nickname}
            postedAt={postDetail.createdAt}
            profileImage={postDetail.profileImgPath}
            size="big"
          />
          <MeatballsMenu
            options={
              postDetail.userId === userInfo?.userId
                ? [
                    { id: '1', label: '수정', type: 'post' },
                    { id: '2', label: '삭제', type: 'post' },
                  ]
                : [{ id: '3', label: '신고하기', type: 'post' }]
            }
            onReportClick={onReportClick}
            onEditClick={onEditClick}
            onRemoveClick={onRemoveClick}
          />
        </div>
        <div>
          <p className="pt-6 text-[16px] font-bold sm:pt-[34px] sm:text-[28px]">
            {postDetail.title}
          </p>
          <p className="pt-4 text-[12px] font-medium break-all whitespace-pre-wrap sm:pt-6 sm:text-[16px]">
            {postDetail.content}
          </p>
        </div>
        {postDetail.images.length !== 0 && (
          <div className="w-full sm:max-w-[calc(100vw-622px)]">
            <ImageList postImage={postDetail.images} />
          </div>
        )}
        <div className="pt-7 sm:pt-14">
          <PostStats
            comment={postDetail.replies}
            like={postDetail.likes}
            views={postDetail.views}
          />
        </div>
      </Card>
    </>
  );
}
