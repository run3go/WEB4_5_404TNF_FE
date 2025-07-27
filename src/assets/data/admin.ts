export const periodData = [
  { value: 'ONE_DAY', label: '1일' },
  { value: 'TWO_DAYS', label: '2일' },
  { value: 'THREE_DAYS', label: '3일' },
  { value: 'FIVE_DAYS', label: '5일' },
  { value: 'SEVEN_DAYS', label: '7일' },
  { value: 'FOURTEEN_DAYS', label: '2주' },
  { value: 'THIRTY_DAYS', label: '1달' },
  { value: 'THREE_MONTHS', label: '3달' },
  { value: 'ONE_YEAR', label: '1년' },
  { value: 'PERMANENT', label: '영구' },
];

export const userState: Record<string, string> = {
  ACTIVE: '활성',
  SUSPENDED: '정지',
  LEAVE: '탈퇴',
};

export const userStateColor: Record<string, string> = {
  ACTIVE: 'text-[var(--color-green)]',
  SUSPENDED: 'text-[var(--color-red)]',
  LEAVE: 'text-[var(--color-grey)]',
};

export const reportState: Record<string, string> = {
  PENDING: '미완료',
  ACCEPT: '제재',
  REJECT: '철회',
};

export const reportStateColor: Record<string, string> = {
  PENDING: 'text-[var(--color-grey)]',
  ACCEPT: 'text-[var(--color-red)]',
  REJECT: 'text-[var(--color-blue-300)]',
};

export const isDone = [
  { value: 'ALL', label: '전체' },
  { value: 'ACCEPT', label: '제재' },
  { value: 'REJECT', label: '철회' },
  { value: 'PENDING', label: '미완료' },
];

export const state = [
  { value: 'ALL', label: '전체' },
  { value: 'ACTIVE', label: '활성' },
  { value: 'SUSPENDED', label: '정지' },
  { value: 'LEAVE', label: '탈퇴' },
];

export const reportType: Record<string, string> = {
  BOARD: '게시물',
  REPLY: '댓글',
};

export const reportReason: Record<string, string> = {
  ABUSE: '부적절한 언행',
  SPAM: '도배 및 광고',
  FRAUD: '사기',
  ADULT_CONTENT: '선정적 콘텐츠',
};
