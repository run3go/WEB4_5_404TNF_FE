import { useRouter } from 'next/navigation';
import Card from '../common/Card';
import PostStats from '../common/PostStats';
import WriterInfo from '../common/WriterInfo';
import Image from 'next/image';

export default function PostCard({
  post,
  boardType,
}: {
  post: PostDetail;
  boardType: 'free' | 'question';
}) {
  const router = useRouter();
  return (
    <>
      <Card className="card__hover mx-1 flex h-[192px] w-full flex-col p-4 hover:!scale-100 sm:h-[228px] sm:w-full sm:p-5 sm:hover:!scale-102">
        <div className="relative pb-7 sm:pb-[62px]">
          <WriterInfo
            authorId={post.userId}
            postId={post.articleId}
            name={post.nickname}
            postedAt={post.createdAt}
            profileImage={post.profileImgPath}
          />
          <div className="mt-3 flex h-[80px] justify-between sm:mt-0">
            <div
              className="w-full cursor-pointer"
              onClick={() =>
                router.push(`/post/${boardType}/${post.articleId}`)
              }
            >
              <p className="text-[14px] font-bold sm:pt-4 sm:text-[20px]">
                {post.title}
              </p>
              <p className="line-clamp-2 h-[58px] pt-2 text-[12px] font-medium break-all whitespace-pre-wrap sm:pt-3 sm:text-[16px]">
                {post.content}
              </p>
            </div>
            {post.articleImgPath[0]?.savePath && (
              <div
                className="relative ml-2 h-[80px] w-[80px] flex-shrink-0 cursor-pointer rounded-[10px] sm:-mt-[46px] sm:ml-[1.05vw] sm:h-[188px] sm:w-[188px] sm:rounded-[30px]"
                onClick={() =>
                  router.push(`/post/${boardType}/${post.articleId}`)
                }
              >
                <Image
                  className="rounded-[10px] sm:rounded-[30px]"
                  src={post.articleImgPath[0]?.savePath}
                  alt="썸네일 이미지"
                  fill
                  priority
                />
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0">
            <PostStats
              comment={post.replies}
              like={post.likes}
              views={post.views}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
