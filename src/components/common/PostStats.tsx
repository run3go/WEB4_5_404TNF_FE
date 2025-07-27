import { useEffect, useState } from 'react';
import Icon from './Icon';
import { cancelLike, getPostDetail, requestLike } from '@/api/post';

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

  const handleLike = async () => {
    if (!postId || isLoading) return;
    setIsLoading(true);
    const prevLiked = liked;
    const prevLike = like;

    setLiked(!prevLiked);
    setLikes(prevLiked ? prevLike - 1 : prevLike + 1);

    try {
      if (!prevLiked) {
        await requestLike(postId);
      } else {
        await cancelLike(postId);
      }
    } catch (err) {
      console.error(err);
      setLiked(prevLiked);
      setLikes(prevLike);
      alert('좋아요 실패');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostDetail(postId!);
        console.log(data.data);
        setLiked(data.data.isLiked);
        setLikes(data.data.like ?? like);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    if (postId) {
      fetchPostDetail();
    }
  }, [postId, like]);
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
