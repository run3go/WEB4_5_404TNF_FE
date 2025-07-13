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
      <Card className="mx-1 flex h-[192px] w-full flex-col p-4 sm:h-[228px] sm:w-full sm:p-5">
        <div className="relative pb-7 sm:pb-[62px]">
          <WriterInfo name={USER_INFO.name} postedAt={USER_INFO.postedAt} />
          <div className="mt-3 flex h-[80px] justify-between sm:mt-0">
            <div className="cursor-pointer">
              <p className="text-[14px] font-bold sm:pt-4 sm:text-[20px]">
                {POST.title}
              </p>
              <p className="line-clamp-2 h-[58px] pt-2 text-[12px] font-medium sm:pt-3 sm:text-[16px]">
                {POST.content}
              </p>
            </div>
            <div className="ml-2 h-[80px] w-[80px] flex-shrink-0 cursor-pointer rounded-[10px] bg-gray-500 sm:-mt-[58px] sm:ml-[1.05vw] sm:h-[200px] sm:w-[200px] sm:rounded-[30px]"></div>
          </div>
          <div className="absolute bottom-0 left-0">
            <PostStats
              comment={POST_STATS.comment}
              like={POST_STATS.like}
              views={POST_STATS.views}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
