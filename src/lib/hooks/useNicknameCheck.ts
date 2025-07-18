import { useMutation } from '@tanstack/react-query';
import { checkNicknameDuplicate } from '@/api/auth';
import { useState } from 'react';

export const useNicknameCheck = () => {
  const [duplicateError, setDuplicateError] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const checkDuplicateMutation = useMutation({
    mutationFn: checkNicknameDuplicate,
    onSuccess: () => {
      setIsNicknameChecked(true);

      setDuplicateError('');
    },
    onError: (error: Error) => {
      setIsNicknameChecked(true);
      setDuplicateError(error.message || '중복 확인 실패');
    },
  });

  const resetNickNameState = () => {
    setDuplicateError('');
    setIsNicknameChecked(false);
  };

  return {
    duplicateError,
    isNicknameChecked,
    checkDuplicateMutation,
    resetNickNameState,
  };
};
