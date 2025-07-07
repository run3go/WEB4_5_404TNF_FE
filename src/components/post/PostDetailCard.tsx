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

export default function PostDetailCard() {
  return (
    <>
      <Card className="w-[1308px] p-8">
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
          />
        </div>
        <div>
          <p className="pt-[34px] text-[28px] font-bold">{POST.title}</p>
          <p className="pt-6 text-[16px] font-medium">{POST.content}</p>
        </div>
        <ImageList />
        <div className="pt-14">
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
