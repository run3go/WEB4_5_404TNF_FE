type Transition = {
  month?: number;
  year?: number;
  joinedCount: number;
  leaveCount: number;
};

type Article = {
  month?: number;
  year?: number;
  articlesCount: number;
};

type UserInfo = {
  userId: number;
  email: string;
  nickname: string;
  postCount: number;
  commentCount: number;
  lastLoginDate: string;
  joinDate: string;
  status: string;
  suspensionEndAt: string;
};

type ReportInfo = {
  reportId: number;
  reporter: string;
  type: string;
  reported: string;
  createdAt: string;
  category: string;
  reason: string;
  status: string;
};

type ReportDetail = {
  reportId: number;
  type: string;
  contentId: number;
  articleId: number;
  boardType: string;
  category: string;
  reason: string;
  status: string;
  reporterNickname: string;
  reportedNickname: string;
  adminReason: string;
  reportedState: string;
  reportedAt: string;
  suspensionEndAt: string;
};

type AcceptInfo = {
  reportId: number;
  period: string;
  adminReason: string;
};

type RejectInfo = {
  reportId: number;
  adminReason: string;
};

type GetListInfo = {
  page: number;
  search: string;
  sort: string;
  sortBy: string;
  status: string;
};

type AdminTableProps = {
  type: 'user' | 'report';
  data: UserInfo[] | ReportInfo[];
  sort: 'ASC' | 'DESC';
  sortBy: string;
  onSortChange: (newSort: 'ASC' | 'DESC') => void;
  onSortByChange: (newSortBy: string) => void;
  currentPage: number;
};

type AdminPageInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};
