type UserProfile = {
  userId: number;
  email: string;
  state: boolean;
  name: string;
  nickname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  password: null;
  provider: 'GOOGLE' | 'KAKAO' | 'NAVER' | 'LOCAL';
  userImg: string | null;
};

interface User {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  provider: string;
  userImg: string | null;
}

type UserInfo = {
  image: File | null;
  nickname: string;
  password: string;
};
