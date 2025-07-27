import { Toast } from '@/components/common/Toast';
import { FieldErrors } from 'react-hook-form';

export const handleError = (errors: FieldErrors<PetFormValues>) => {
  if (errors.name) {
    if (errors.name.type === 'too_big') {
      Toast.error(`${errors.name.message}`);
    } else {
      Toast.error(errors.name.message);
    }
  } else if (errors.birthday) {
    Toast.error(errors.birthday.message);
  } else if (errors.size) {
    Toast.error('크기를 선택해 주세요');
  } else if (errors.isNeutered) {
    Toast.error('중성화 여부를 선택해 주세요');
  } else if (errors.sex) {
    Toast.error('성별을 선택해 주세요');
  } else if (errors.registNumber) {
    Toast.error(`${errors.registNumber.message}`);
  } else if (errors.weight) {
    if (errors.weight.type === 'invalid_type') {
      Toast.error('몸무게를 입력해주세요 1~200');
    } else {
      Toast.error(errors.weight.message);
    }
  }
};
