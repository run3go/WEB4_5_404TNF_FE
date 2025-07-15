export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) return '이메일을 입력해주세요.';

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(trimmedEmail)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  return '';
};

// 영문, 숫자, 특수문자 포함 8~20자
export const validatePassword = (password: string): string => {
  const trimmedPassword = password.trim();

  if (!trimmedPassword) return '비밀번호를 입력해주세요.';
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

  if (!regex.test(trimmedPassword)) {
    return '비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.';
  }

  return '';
};

// 한글, 영어 대소문자,숫자로 10글자 이내
export const validateNickname = (nickname: string): string => {
  const trimmedNickname = nickname.trim();

  if (!trimmedNickname) return '닉네임을 입력해주세요.';

  if (trimmedNickname.length > 10) return '닉네임은 10자 이내여야 합니다.';

  const regex = /^[가-힣a-zA-Z0-9]+$/;
  if (!regex.test(trimmedNickname)) {
    return '닉네임은 한글, 영어 대소문자, 숫자만 가능합니다.';
  }

  return '';
};

// 한글, 영어 대소문자로 10글자 이내
export const validateName = (name: string): string => {
  const trimmedName = name.trim();

  if (!trimmedName) return '이름을 입력해주세요.';

  if (trimmedName.length > 10) return '이름은 10자 이내여야 합니다.';

  const regex = /^[가-힣a-zA-Z]+$/;
  if (!regex.test(trimmedName)) {
    return '이름은 한글, 영어 대소문자만 가능합니다';
  }

  return '';
};
