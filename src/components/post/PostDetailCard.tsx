import Card from '../common/Card';
import MeatballsMenu from '../common/MeatballsMenu';
import PostStats from '../common/PostStats';
import WriterInfo from '../common/WriterInfo';
import ImageList from './ImageList';

const USER_INFO = {
  name: '유저닉네임',
  postedAt: '2025.06.20 12:34',
};

const POST = {
  title: '고민이 있습니다...!!',
  content:
    '요즘들어 밥을 잘 안먹습니다ㅜㅜ 왜 이럴까요..? 다른 친구들도 그런가요?? 두 줄로 나온다면 어떤 느낌일까 요즘들어 밥을 잘 안먹습니다ㅜㅜ 왜 이럴까요..? 다른 친구들도 그런가요?? 두 줄로 나온다면 어떤 느낌일까요즘들어 밥을 잘 안먹습니다ㅜㅜ 왜 이럴까요..? 다른 친구들도 그런가요?? 두 줄로 나온다면 어떤 느낌일까요즘들어 밥을 잘 안먹습니다ㅜㅜ 왜 이럴까요..? 다른 친구들도 그런가요?? 두 줄로 나온다면 어떤 느낌일까',
};

const POST_STATS = {
  comment: '3',
  like: '10',
  views: '34',
};

interface PostDetailCardProps {
  onReportClick: () => void;
  onEditClick: () => void;
}

export default function PostDetailCard({
  onReportClick,
  onEditClick,
}: PostDetailCardProps) {
  return (
    <>
      <Card className="m-6 w-[calc(100vw-48px)] p-4 sm:m-0 sm:w-[1308px] sm:p-8">
        <div className="flex items-center justify-between">
          <WriterInfo
            name={USER_INFO.name}
            postedAt={USER_INFO.postedAt}
            size="big"
          />
          <MeatballsMenu
            options={[
              { id: '1', label: '수정', type: 'post' },
              { id: '2', label: '삭제', type: 'post' },
              { id: '3', label: '신고하기', type: 'post' },
            ]}
            onReportClick={onReportClick}
            onEditClick={onEditClick}
          />
        </div>
        <div>
          <p className="pt-6 text-[16px] font-bold sm:pt-[34px] sm:text-[28px]">
            {POST.title}
          </p>
          <p className="pt-4 text-[12px] font-medium sm:pt-6 sm:text-[16px]">
            {POST.content}
          </p>
        </div>
        <ImageList />
        <div className="pt-7 sm:pt-14">
          <PostStats
            comment={POST_STATS.comment}
            like={POST_STATS.like}
            views={POST_STATS.views}
          />
        </div>
      </Card>
    </>
  );
}
