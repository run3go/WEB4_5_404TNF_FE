import { useNicknameCheck } from '@/lib/hooks/useNicknameCheck';
import { validateNickname } from '@/lib/utils/validation';
import { useState } from 'react';

export default function NicknameField({
  nickname,
  onNicknameVerified,
}: {
  nickname: string;
  onNicknameVerified: (nickname: string) => void;
}) {
  const [value, setValue] = useState(nickname);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const { isNicknameDuplicate, nicknameState, resetNickNameState } =
    useNicknameCheck();

  const handleChange = (value: string) => {
    setValue(value);
    setError(validateNickname(value));
    resetNickNameState();
    setTouched(true);
  };
  const handleDuplicationCheck = async () => {
    const validationError = validateNickname(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    const success = await isNicknameDuplicate(value);
    if (success) {
      onNicknameVerified(value);
    }
  };
  return (
    <div className="mb-10 basis-1/2">
      <label className="mb-2 flex justify-between" htmlFor="name">
        <div>
          닉네임<span className="text-[var(--color-red)]"> *</span>
        </div>
        <button
          type="button"
          className="cursor-pointer text-[14px] font-medium text-[#FF9526]"
          onClick={handleDuplicationCheck}
        >
          중복확인
        </button>
      </label>
      <input
        id="name"
        className="profile-input-style w-full"
        type="text"
        placeholder="닉네임을 적어주세요 (1~10자 이내)"
        value={value}
        onChange={(e) => handleChange(e.target.value.trim())}
        onBlur={() => {
          setTouched(true);
          setError(validateNickname(nickname || ''));
        }}
      />
      {touched && error && <p className="auth__error absolute">{error}</p>}
      {nicknameState.duplicateError && (
        <p className="auth__error absolute">{nicknameState.duplicateError}</p>
      )}
      {nicknameState.checkedNickname === value && value && (
        <p className="auth__success absolute">사용 가능한 닉네임입니다.</p>
      )}
    </div>
  );
}
