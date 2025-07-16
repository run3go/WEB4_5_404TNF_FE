import { useState } from 'react';
import { checkNicknameDuplicate } from '@/api/auth';

export const useNicknameCheck = () => {
  const [nicknameState, setNicknameState] = useState({
    checkedNickname: '',
    duplicateError: '',
    isNicknameChecked: false,
  });

  const isNicknameDuplicate = async (nickname: string) => {
    try {
      await checkNicknameDuplicate(nickname);
      setNicknameState({
        checkedNickname: nickname,
        duplicateError: '',
        isNicknameChecked: true,
      });
      return true;
    } catch (err) {
      setNicknameState((prev) => ({
        ...prev,
        duplicateError: err instanceof Error ? err.message : '중복 확인 실패',
      }));
      return false;
    }
  };

  const resetNickNameState = () => {
    setNicknameState({
      checkedNickname: '',
      duplicateError: '',
      isNicknameChecked: false,
    });
  };

  return { nicknameState, isNicknameDuplicate, resetNickNameState };
};
