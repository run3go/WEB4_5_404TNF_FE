import { useNicknameCheck } from '@/lib/hooks/useNicknameCheck';
import { validateNickname } from '@/lib/utils/validation';
import { useState } from 'react';

export default function NicknameField({
  nickname,
  isDisabled,
  onNicknameVerified,
  setAble,
  setDisable,
}: {
  nickname: string;
  isDisabled: boolean;
  onNicknameVerified: (nickname: string) => void;
  setAble: () => void;
  setDisable: () => void;
}) {
  const [value, setValue] = useState(nickname);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const {
    checkDuplicateMutation,
    duplicateError,
    isNicknameChecked,
    resetNickNameState,
  } = useNicknameCheck();

  const handleChange = (currentValue: string) => {
    setValue(currentValue);
    setError(validateNickname(currentValue));
    resetNickNameState();
    setTouched(true);
    if (currentValue === nickname) {
      setAble();
    } else {
      setDisable();
    }
  };

  const handleDuplicationCheck = async () => {
    if (nickname === value) return;
    const validationError = validateNickname(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    checkDuplicateMutation.mutate(value, {
      onSuccess: () => {
        onNicknameVerified(value);
        setAble();
      },
    });
  };
  return (
    <div className="mb-10 basis-1/2">
      <label className="mb-2 flex justify-between" htmlFor="name">
        <div>
          닉네임<span className="text-[var(--color-red)]"> *</span>
        </div>
        <button
          type="button"
          className={`cursor-pointer text-[14px] font-medium text-[#FF9526] ${isDisabled && 'animate-pulse'}`}
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
          setError(validateNickname(value || ''));
        }}
      />
      {touched && error && <p className="auth__error absolute">{error}</p>}
      {isNicknameChecked && duplicateError && (
        <p className="auth__error">{duplicateError}</p>
      )}
      {isNicknameChecked && !duplicateError && (
        <p className="auth__success">사용 가능한 닉네임입니다.</p>
      )}
    </div>
  );
}
