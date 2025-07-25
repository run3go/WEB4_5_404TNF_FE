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

type UserStatus = '활성' | '정지';

type UserInfo = {
  id: number;
  email: string;
  nickname: string;
  postCount: number;
  commentCount: number;
  createdAt: string;
  lastLogin: string;
  status: UserStatus;
  statusChangedAt: string;
};

type ReportType = '게시물' | '댓글';
type ReportCategory =
  | '욕설'
  | '성희롱'
  | '도배'
  | '스팸'
  | '혐오 발언'
  | '광고'
  | '음란물'
  | '개인정보 노출'
  | '허위 정보'
  | '기타';

type ReportInfo = {
  id: number;
  reporter: string;
  targetType: ReportType;
  reportedUser: string;
  reportDate: string;
  reason: ReportCategory;
  isDone: boolean;
};

type ReportDetail = {
  reportId: number;
  type: string;
  contentId: number;
  articleId: number;
  boardName: string;
  category: string;
  reason: string;
  status: string;
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
