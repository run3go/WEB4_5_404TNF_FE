interface NotificationInfo {
  notiId: number;
  type:
    | 'REPORT_SUCCESS'
    | 'REPORT_FAIL'
    | 'REPORTED'
    | 'LIKE'
    | 'COMMENT'
    | 'SCHEDULE';
  content: string;
  targetId: number;
  isRead: boolean;
  createdAt: string;
}
