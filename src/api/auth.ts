export const checkEmailDuplicate = async (email: string) => {
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/check-email?email=${email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 중복 확인 실패');
  }
};

export const sendEmailVerification = async (email: string) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/email-verifications',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 인증코드 보내기 실패');
  }
};

export const verifyEmailCode = async (
  email: string,
  verificationCode: string,
) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/email-verifications/verify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, verificationCode }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 인증코드 확인 실패');
  }
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/check-nickname?nickname=${nickname}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '닉네임 중복 확인 실패');
  }
};

export const register = async (formData: {
  name: string;
  nickname: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v2/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '회원가입 실패');
  }
};
