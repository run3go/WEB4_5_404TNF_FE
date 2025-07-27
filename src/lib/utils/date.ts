export const calculateAge = (age: number) => {
  const year = Math.floor(age / 12);
  const month = age % 12;
  if (year && month) {
    return `${year}년 ${month}개월`;
  }
  if (year) {
    return `${year}년`;
  }
  if (month) {
    return `${month}개월`;
  } else {
    return '0개월';
  }
};

export const calculateMetDay = (date: string) => {
  const today = new Date();
  const metday = new Date(date);
  const diff = today.getTime() - metday.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
