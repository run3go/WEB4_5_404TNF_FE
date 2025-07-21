interface Post {
  articleId: number;
  userId: number;
  nickname: string;
  profileImgPath: string | null;
  createdAt: string;
  updatedAt: string | null;
  title: string;
  content: string;
  likes: number;
  replies: number;
  views: number;
  articleImgPath: string[];
}

interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

interface GetBoardPostsResponse {
  data: {
    articleList: Post[];
    pageInfo: PageInfo;
  };
}

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

interface PostComment {
  articleId: number;
  replyId: number;
  userId: number;
  nickname: string;
  profileImgPath: string | null;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

interface CommentListResponse {
  data: {
    replyList: PostComment[];
    pageInfo: {
      totalElements: number;
    };
  };
}
