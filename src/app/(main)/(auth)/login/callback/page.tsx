import Callback from '@/components/auth/login/Callback';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소셜 로그인',
};

export default function page() {
  return (
    <>
      <Callback />
    </>
  );
}
