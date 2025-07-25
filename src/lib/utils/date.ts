export const calculateAge = (age: number) => {
  const year = Math.floor(age / 12);
  const month = age % 12;
  return `${year ? year + '년 ' : ''}${month ? month + '개월' : '0개월'}`;
};

export const calculateMetDay = (date: string) => {
  const today = new Date();
  const metday = new Date(date);
  const diff = today.getTime() - metday.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
