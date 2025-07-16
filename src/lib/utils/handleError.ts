import { FieldErrors } from 'react-hook-form';

export const handleError = (errors: FieldErrors<PetFormValues>) => {
  if (errors.name) {
    if (errors.name.type === 'too_big') {
      const len = errors.name.ref?.value.trim().length;
      console.log(`${errors.name.message} 현재: ${len}`);
    } else {
      console.log(errors.name.message);
    }
  } else if (errors.birthday) {
    console.log(errors.birthday.message);
  } else if (errors.size) {
    console.log('크기를 선택해 주세요');
  } else if (errors.isNeutered) {
    console.log('중성화 여부를 선택해 주세요');
  } else if (errors.sex) {
    console.log('성별을 선택해 주세요');
  } else if (errors.registNumber) {
    const len = errors.registNumber.ref?.value.trim().length;
    console.log(`${errors.registNumber.message} 현재: ${len}자`);
  } else if (errors.weight) {
    if (errors.weight.type === 'invalid_type') {
      console.log('몸무게를 입력해주세요 1~200');
    } else {
      console.log(errors.weight.message);
    }
  }
};
