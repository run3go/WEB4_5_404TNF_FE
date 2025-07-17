import SignupForm from '@/components/auth/signup/SignupForm';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Signup() {
  const cookieStore = cookies();
  const isAgreeTerms = (await cookieStore).get('isAgreeTerms')?.value;

  if (isAgreeTerms !== 'true') {
    redirect('/terms');
  }

  return (
    <>
      <div className="scrollbar-hidden h-[calc(100vh-72px)] w-screen min-w-[375px] overflow-y-auto bg-[var(--color-background)] py-10 sm:h-full sm:w-full sm:py-0">
        <div className="flex justify-center font-medium text-[#2B2926] sm:text-[32px]">
          <p className="font-bold text-[#FF9526]">멍멍일지</p>
          <p>와 함께하는 즐거운 반려생활</p>
        </div>
        <SignupForm />
      </div>
    </>
  );
}
