type PostType = 'WRITE' | 'LIKE' | 'COMMENT';

type SortType = 'DATE' | 'LIKE' | 'VIEW';

type PostPaylaod = {
  page: string;
  size: string;
  sortType: SortType;
};

type Post = {
  articles: PostDetail[];
  pageInfo: PageInfo;
};

type PostDetail = {
  articleId: number;
  userId: number;
  nickname: string;
  profileImgPath: string;
  createdAt: string;
  updatedAt: string | null;
  name: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  views: number;
  articleImgPath: PostImage[];
};

type PostImage = {
  articleImgId: number;
  articleId: number;
  savePath: string;
  imgType: 'THUMBNAIL';
};

type PageInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};

interface GetBoardPostsResponse {
  data: {
    articleList: Post[];
    pageInfo: PageInfo;
  };
}

interface CommunityPostDeatail {
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
  images: PostImage[];
}

interface PostImage {
  articleImgId: number;
  articleId: number;
  savePath: string;
  imgType: string;
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
