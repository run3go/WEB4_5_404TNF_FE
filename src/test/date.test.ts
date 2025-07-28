import { calculateAge, calculateMetDay } from '../lib/utils/date';

describe('calculateAge', () => {
  it('12개월 미만이면 오직 월만 반환한다', () => {
    expect(calculateAge(5)).toBe('5개월');
    expect(calculateAge(0)).toBe('0개월');
  });

  it('12개월 이상이면 년과 월을 반환한다', () => {
    expect(calculateAge(14)).toBe('1년 2개월');
    expect(calculateAge(30)).toBe('2년 6개월');
  });

  it('12개월 단위이면 오직 년만 반환한다', () => {
    expect(calculateAge(12)).toBe('1년');
    expect(calculateAge(60)).toBe('5년');
  });
});

describe('calculateMetDay', () => {
  const time = new Date('2025-07-27');
  jest.useFakeTimers().setSystemTime(time);

  it('오늘을 기준으로 만난 날짜를 계산한다', () => {
    expect(calculateMetDay('2025-07-26')).toBe(1);
    expect(calculateMetDay('2025-07-20')).toBe(7);
    expect(calculateMetDay('2025-06-27')).toBe(30);
  });
});
