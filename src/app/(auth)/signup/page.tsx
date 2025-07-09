import SignupForm from '@/components/auth/signup/SignupForm';

export default async function Signup() {
  return (
    <>
      <div className="min-h-screen w-screen min-w-[375px] bg-[var(--color-background)] py-10">
        <div className="flex justify-center font-medium text-[#2B2926]">
          <p className="font-bold text-[#FF9526]">멍멍일지</p>
          <p>와 함께하는 즐거운 반려생활</p>
        </div>
        <SignupForm />
      </div>
    </>
  );
}
