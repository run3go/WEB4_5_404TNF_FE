type PostType = 'WRITE' | 'LIKE' | 'COMMENT';

type SortType = 'DATE' | 'LIKE' | 'VIEW';

type PostPaylaod = {
  page: string;
  size: string;
  sortType: SortType;
};

type Post = {
  articles: Article[];
  pageInfo: PageInfo;
};

type Article = {
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
  articleImgPath: ArticleImage[];
};

type ArticleImage = {
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
