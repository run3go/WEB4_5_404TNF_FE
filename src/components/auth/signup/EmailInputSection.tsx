'use client';

import { useEmailCheck } from '@/lib/hooks/useEmailCheck';
import { validateEmail } from '@/lib/utils/validation';
import { useState } from 'react';
import CountdownTimer from './CountdownTimer';

export default function EmailInputSection({
  onEmailVerified,
  onEmailChange,
}: {
  onEmailVerified: (email: string) => void;
  onEmailChange: () => void;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [touched, setTouched] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const {
    emailState,
    checkDuplicateMutation,
    sendVerificationCodeMutation,
    verifyCodeMutation,
    resetEmailState,
    resetVerificationError,
  } = useEmailCheck();

  const handleChange = (value: string) => {
    setEmail(value);
    setError(validateEmail(value));
    resetEmailState();
    setTouched(true);
    onEmailChange();
  };

  const handleSendEmailVerify = async () => {
    if (sendVerificationCodeMutation.isPending) return;
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const isDuplicate = await checkDuplicateMutation.mutateAsync(email);
      if (!isDuplicate) {
        return;
      }
      const sent = await sendVerificationCodeMutation.mutateAsync(email);
      if (!sent) {
        return;
      }

      setVerificationCode('');
      setIsVerificationSent(true);
      setTimerKey((prev) => prev + 1);
      setIsTimerExpired(false);
      setError('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = () => {
    if (verifyCodeMutation.isPending) return;
    resetVerificationError();

    verifyCodeMutation.mutate(
      {
        email,
        code: verificationCode,
      },
      {
        onSuccess: () => {
          onEmailVerified(email);
        },
      },
    );
  };
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <label className="text-[14px] font-medium text-[#909090] sm:text-[15px]">
          이메일
        </label>
        <button
          type="button"
          onClick={handleSendEmailVerify}
          className={`${sendVerificationCodeMutation.isPending ? '' : 'cursor-pointer'} text-[14px] font-medium text-[#FF9526]`}
        >
          {sendVerificationCodeMutation.isPending
            ? '인증번호 전송 중'
            : '인증번호 전송'}
        </button>
      </div>
      <input
        type="email"
        name="email"
        className={`auth__input focus:!border-[#FCC389] ${
          touched && error ? '!border-[var(--color-red)]' : ''
        }`}
        placeholder="example@example.com"
        value={email}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value.trim())}
        onBlur={() => {
          setTouched(true);
          setError(validateEmail(email));
        }}
      />
      {touched && error && <p className="auth__error">{error}</p>}
      {emailState.duplicateError && (
        <p className="auth__error">{emailState.duplicateError}</p>
      )}

      {isVerificationSent && (
        <>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="text"
              name="verificationCode"
              placeholder="인증코드를 입력해주세요"
              className="auth__input w-full focus:!border-[#FCC389]"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.trim())}
            />
            <CountdownTimer
              seconds={180}
              keyReset={timerKey}
              onStatusChange={setIsTimerExpired}
              stop={emailState.isEmailVerified}
            />
            <button
              type="button"
              disabled={!verificationCode || isTimerExpired}
              onClick={handleVerifyCode}
              className="mt-2 flex h-[40px] w-[86px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-[#FFDBAB] px-7 py-4 text-[14px] text-[#2B2926] disabled:bg-[#2B2926]/20 disabled:text-[#909090] sm:h-[52px] dark:disabled:bg-[#4f4f4f]"
            >
              확인
            </button>
          </div>
          {emailState.isEmailVerified && (
            <p className="auth__success">이메일 인증이 완료되었습니다.</p>
          )}
          {emailState.verificationError && (
            <p className="auth__error">{emailState.verificationError}</p>
          )}
        </>
      )}
    </div>
  );
}
