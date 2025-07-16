'use client';

import { useState } from 'react';
import { validateNickname } from '@/lib/utils/validation';
import { useNicknameCheck } from '@/lib/hooks/useNicknameCheck';

export default function NicknameInputSection({
  onNicknameVerified,
}: {
  onNicknameVerified: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const { nicknameState, isNicknameDuplicate, resetNickNameState } =
    useNicknameCheck();

  const handleChange = (value: string) => {
    setNickname(value);
    setError(validateNickname(value));
    resetNickNameState();
    setTouched(true);
  };
  const handleDuplicationCheck = async () => {
    const validationError = validateNickname(nickname);
    if (validationError) {
      setError(validationError);
      return;
    }

    const success = await isNicknameDuplicate(nickname);
    if (success) {
      onNicknameVerified(nickname);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex max-w-[720px] justify-between">
        <label className="text-[14px] font-medium text-[#909090] sm:text-[15px]">
          닉네임
        </label>
        <button
          type="button"
          className="cursor-pointer text-[14px] font-medium text-[#FF9526]"
          onClick={handleDuplicationCheck}
        >
          중복확인
        </button>
      </div>
      <input
        type="text"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        className={`auth__input focus:!border-[#FCC389] ${
          touched && error ? '!border-[var(--color-red)]' : ''
        }`}
        value={nickname}
        onChange={(e) => handleChange(e.target.value.trim())}
        onBlur={() => {
          setTouched(true);
          setError(validateNickname(nickname));
        }}
      />
      {touched && error && <p className="auth__error">{error}</p>}
      {nicknameState.duplicateError && (
        <p className="auth__error">{nicknameState.duplicateError}</p>
      )}
      {nicknameState.checkedNickname === nickname && nickname && (
        <p className="auth__success">사용 가능한 닉네임입니다.</p>
      )}
    </div>
  );
}
