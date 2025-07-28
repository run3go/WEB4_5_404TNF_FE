import { useEffect, useState } from 'react';
import Icon from './Icon';
import { cancelLike, getLikeCount, requestLike } from '@/api/post';
import { useAuthStore } from '@/stores/authStoe';

interface PostStats {
  comment: number;
  like: number;
  views: number;
  postId?: number;
}

export default function PostStats({ comment, like, views, postId }: PostStats) {
  const [likes, setLikes] = useState(like);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  const handleLike = async () => {
    if (!userInfo || !postId || isLoading) return;
    setIsLoading(true);

    const prevLiked = liked;
    const prevLikes = likes;

    const nextLiked = !prevLiked;
    const nextLikes = prevLiked ? prevLikes - 1 : prevLikes + 1;

    setLiked(nextLiked);
    setLikes(nextLikes);

    try {
      const res = nextLiked
        ? await requestLike(postId)
        : await cancelLike(postId);

      setLiked(res.data.isLiked);
      setLikes(res.data.like);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      setLiked(prevLiked);
      setLikes(prevLikes);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (!postId) return;
        const res = await getLikeCount(postId);
        setLiked(res.data.isLiked);
        setLikes(res.data.like);
      } catch (error) {
        console.error('좋아요 상태 불러오기 실패:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);
  return (
    <>
      <div className="flex gap-2 font-medium sm:gap-4">
        <div
          className={`flex items-center gap-1 sm:gap-2 ${postId ? 'cursor-pointer' : ''}`}
          onClick={handleLike}
        >
          {liked ? (
            <Icon
              width="16px"
              height="16px"
              left="-65px"
              top="-207px"
              className="mt-0.5 scale-75 sm:scale-100"
            />
          ) : (
            <Icon
              width="16px"
              height="16px"
              left="-26px"
              top="-207px"
              className="mt-0.5 scale-75 sm:scale-100"
            />
          )}
          <p className="pt-1 text-[10px] sm:pt-[2px] sm:text-[14px]">{likes}</p>
        </div>
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
