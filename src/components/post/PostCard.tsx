import Card from '../common/Card';
import PostStats from '../common/PostStats';
import WriterInfo from '../common/WriterInfo';

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

export default function PostCard() {
  return (
    <>
      <Card className="flex h-[240px] w-[1308px] p-5">
        <div className="relative">
          <WriterInfo name={USER_INFO.name} postedAt={USER_INFO.postedAt} />
          <p className="pt-6 text-[20px] font-bold">{POST.title}</p>
          <p className="line-clamp-2 pt-3 text-[16px] font-medium">
            {POST.content}
          </p>
          <div className="absolute bottom-0 left-0">
            <PostStats
              comment={POST_STATS.comment}
              like={POST_STATS.like}
              views={POST_STATS.views}
            />
          </div>
        </div>
        <div className="ml-5 h-[200px] w-[200px] flex-shrink-0 rounded-[30px] bg-gray-500"></div>
      </Card>
    </>
  );
}
