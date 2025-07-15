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

  if (!res.ok) throw new Error('Email duplicate check failed');

  return res;
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
  if (!res.ok) throw new Error('Send email verification failed');
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
  if (!res.ok) throw new Error('Email verification failed');
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
    throw new Error('Nickname duplicate check failed');
  }

  return res;
};

export const register = async (data: {
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
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) throw new Error('Registration failed');
};
