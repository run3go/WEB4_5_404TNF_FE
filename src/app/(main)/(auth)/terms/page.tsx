import { TERMS } from '@/assets/data/terms';
import TermsAgreement from '@/components/auth/terms/TermsAgreement';

export default async function Terms() {
  return (
    <>
      <div className="scrollbar-hidden flex h-full w-screen min-w-[375px] flex-col justify-between overflow-y-auto bg-[var(--color-background)] py-[4.24vh] sm:w-full sm:py-0 dark:bg-[var(--color-black)]">
        <div>
          <p className="mt-4 text-center text-[16px] font-bold sm:mt-8 sm:text-[28px]">
            이용약관 동의
          </p>
          <div className="scrollbar-hidden mx-6 mt-9 h-[30.3vh] space-y-2 overflow-y-auto rounded-[12px] border border-[#FCC389] p-5 pl-5 sm:mx-[19.5vw] sm:h-[45.9vh] sm:p-6">
            {TERMS.map((term, i) => (
              <p key={i} className="text-[12px] font-medium sm:text-[16px]">
                {term}
              </p>
            ))}
          </div>
        </div>

        <TermsAgreement />
      </div>
    </>
  );
}
