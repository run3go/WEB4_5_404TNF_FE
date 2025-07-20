interface PostDeatail {
  articleId: number;
  userId: number;
  nickname: string;
  profileImgPath: string | null;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  replies: number;
  likes: number;
  views: number;
  isLiked: boolean;
  images: string[];
}
