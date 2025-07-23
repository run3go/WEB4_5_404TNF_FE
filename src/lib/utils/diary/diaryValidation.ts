// feeding list
export function validateFeedingList(feedingList: FeedEntry[]): string | null {
  for (const entry of feedingList) {
    const { hour, minute, amount } = entry;
    const hasEntry =
      hour.trim() !== '' || minute.trim() !== '' || amount.trim() !== '';

    // incomplete entry
    const isIncomplete =
      hasEntry &&
      (hour.trim() === '' || minute.trim() === '' || amount.trim() === '');

    if (isIncomplete) {
      return '식사 기록의 모든 입력칸을 채워주세요';
    }

    if (hasEntry) {
      const hourNum = Number(hour);
      const minuteNum = Number(minute);

      // time
      if (
        isNaN(hourNum) ||
        hourNum < 0 ||
        hourNum > 24 ||
        isNaN(minuteNum) ||
        minuteNum < 0 ||
        minuteNum > 59
      ) {
        return '시간은 24시 / 59분 이하의 숫자로 입력해주세요';
      }
    }
  }

  return null;
}

// walking list
export function validateWalkingList(walkingList: WalkEntry[]): string | null {
  for (const entry of walkingList) {
    const { startHour, startMinute, endHour, endMinute } = entry;
    const hasEntry =
      startHour.trim() !== '' ||
      startMinute.trim() !== '' ||
      endHour.trim() !== '' ||
      endMinute.trim() !== '';

    // incomplete entry
    const isIncomplete =
      hasEntry &&
      (startHour.trim() === '' ||
        startMinute.trim() === '' ||
        endHour.trim() === '' ||
        endMinute.trim() === '');

    if (isIncomplete) {
      return '산책 기록의 모든 입력칸을 채워주세요';
    }

    if (hasEntry) {
      const startH = Number(startHour);
      const startM = Number(startMinute);
      const endH = Number(endHour);
      const endM = Number(endMinute);

      // time
      if (
        isNaN(startH) ||
        startH < 0 ||
        startH > 24 ||
        isNaN(startM) ||
        startM < 0 ||
        startM > 59 ||
        isNaN(endH) ||
        endH < 0 ||
        endH > 24 ||
        isNaN(endM) ||
        endM < 0 ||
        endM > 59
      ) {
        return '시간은 24시 / 59분 이하의 숫자로 입력해주세요';
      }

      // start time >= end time
      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      if (startTotal >= endTotal) {
        return '종료 시간은 시작 시간 이후로 입력해주세요';
      }
    }
  }

  return null;
}

// run validation
export function runDiaryValidation({
  feedingList,
  walkingList,
  weight,
  sleepTime,
  note,
}: {
  feedingList: FeedEntry[];
  walkingList: WalkEntry[];
  weight: string;
  sleepTime: string;
  note: string;
}): string | null {
  const feedingError = validateFeedingList(feedingList);
  if (feedingError) return feedingError;

  const walkingError = validateWalkingList(walkingList);
  if (walkingError) return walkingError;

  if (weight && (isNaN(Number(weight)) || Number(weight) > 200)) {
    return '몸무게는 200kg 이하로 입력해주세요';
  }

  if (sleepTime && (isNaN(Number(sleepTime)) || Number(sleepTime) > 24)) {
    return '수면 시간은 24시간 이하로 입력해주세요';
  }

  const hasAnyInput =
    note.trim() !== '' ||
    weight.trim() !== '' ||
    sleepTime.trim() !== '' ||
    feedingList.some((f) => f.hour || f.minute || f.amount) ||
    walkingList.some(
      (w) => w.startHour || w.startMinute || w.endHour || w.endMinute,
    );

  if (!hasAnyInput) {
    return '모든 항목이 비어 있습니다. 최소 한 가지 이상 기록해주세요';
  }

  return null;
}
