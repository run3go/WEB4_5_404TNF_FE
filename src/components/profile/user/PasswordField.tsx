import { Dispatch, SetStateAction, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function PasswordField({
  passwordHook,
}: {
  passwordHook: {
    password: string;
    confirmPassword: string;
    errors: {
      password: string;
      confirmPassword: string;
    };
    currentPwd: string;
    setCurrentPwd: Dispatch<SetStateAction<string>>;
    checkCurrentPassword: () => void;
    handlePasswordChange: (value: string) => void;
    handleConfirmPasswordChange: (value: string) => void;
    handleBlur: (field: 'password' | 'confirmPassword') => void;
  };
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const [isFieldOpen, setIsFieldOepn] = useState(false);
  const {
    currentPwd,
    errors,
    password,
    confirmPassword,
    checkCurrentPassword,
    handleBlur,
    handleConfirmPasswordChange,
    handlePasswordChange,
    setCurrentPwd,
  } = passwordHook;
  return (
    <>
      <button
        className="cursor-pointer self-start underline"
        type="button"
        onClick={() => setIsFieldOepn((state) => !state)}
      >
        비밀번호 변경
      </button>
      {isFieldOpen &&
        (isMobile ? (
          <>
            <div className="flex flex-col gap-10">
              <div className="mt-8 w-full items-center">
                <label className="mb-3 block" htmlFor="name">
                  현재 비밀번호
                </label>
                <div className="flex w-full">
                  <input
                    id="name"
                    className="profile-input-style w-full"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-4 w-18 cursor-pointer rounded-[12px] bg-[var(--color-primary-300)] py-[10px] hover:bg-[var(--color-primary-500)]"
                    onClick={checkCurrentPassword}
                  >
                    확인
                  </button>
                </div>
              </div>
              <div className="w-full items-center">
                <label className="mb-3 block" htmlFor="name">
                  새 비밀번호
                </label>
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="password"
                  placeholder="영문/숫자/특수문자 혼합 8~20자"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value.trim())}
                  onBlur={() => handleBlur('password')}
                />
                {errors.password && (
                  <p className="auth__error absolute">{errors.password}</p>
                )}
              </div>
              <div className="w-full items-center">
                <label className="mb-3 block" htmlFor="name">
                  새 비밀번호 확인
                </label>
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  value={confirmPassword}
                  onChange={(e) =>
                    handleConfirmPasswordChange(e.target.value.trim())
                  }
                  onBlur={() => handleBlur('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="auth__error absolute">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 mb-12 flex w-full items-center">
              <label className="basis-1/4" htmlFor="name">
                현재 비밀번호
              </label>
              <div className="flex w-full">
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
                <button
                  type="button"
                  className="ml-4 w-18 cursor-pointer rounded-[12px] bg-[var(--color-primary-300)] py-[10px] hover:bg-[var(--color-primary-500)]"
                  onClick={checkCurrentPassword}
                >
                  확인
                </button>
              </div>
            </div>
            <div className="mb-12 flex w-full items-center">
              <label className="basis-1/4" htmlFor="name">
                새 비밀번호
              </label>
              <div className="w-full">
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="password"
                  placeholder="영문/숫자/특수문자 혼합 8~20자"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value.trim())}
                  onBlur={() => handleBlur('password')}
                />
                {errors.password && (
                  <p className="auth__error absolute">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="mb-7 flex w-full items-center">
              <label className="basis-1/4" htmlFor="name">
                새 비밀번호 확인
              </label>
              <div className="w-full">
                <input
                  id="name"
                  className="profile-input-style w-full"
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  value={confirmPassword}
                  onChange={(e) =>
                    handleConfirmPasswordChange(e.target.value.trim())
                  }
                  onBlur={() => handleBlur('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="auth__error absolute">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </>
        ))}
    </>
  );
}
