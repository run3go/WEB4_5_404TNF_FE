type UserProfile = {
  userId: number;
  email: string;
  state: boolean;
  name: string;
  nickname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  password: null;
  provider: 'GOOGLE' | 'KAKAO' | 'NAVER' | 'LOCAL';
  userImg: null;
};
