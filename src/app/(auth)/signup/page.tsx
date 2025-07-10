import SignupForm from '@/components/auth/signup/SignupForm';

export default async function Signup() {
  return (
    <>
      <div className="scrollbar-hidden w-screen max-w-[1548px] min-w-[375px] overflow-y-auto bg-[var(--color-background)] py-10 sm:w-[calc(100vw-276px)]">
        <div className="flex justify-center font-medium text-[#2B2926] sm:text-[32px]">
          <p className="font-bold text-[#FF9526]">멍멍일지</p>
          <p>와 함께하는 즐거운 반려생활</p>
        </div>
        <SignupForm />
      </div>
    </>
  );
}
