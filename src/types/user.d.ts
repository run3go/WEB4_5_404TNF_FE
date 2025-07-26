type UserProfile = {
  userId: number;
  email: string;
  state: boolean;
  name: string;
  nickname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  password: null;
  provider: 'google' | 'kakao' | 'local';
  imgUrl: string | null;
};

interface User {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  provider: string;
  imgUrl: string | null;
}

type ProfileInfo = {
  image: File | null;
  nickname: string;
  password: string;
};
