export function transformFeedingList(
  feedingList: FeedEntry[],
  recordAt: string,
) {
  return feedingList.map((entry) => ({
    amount: Number(entry.amount),
    mealtime: `${recordAt}T${entry.hour.padStart(2, '0')}:${entry.minute.padStart(2, '0')}:00`,
    unit: entry.unit,
  }));
}

export function transformWalkingList(
  walkingList: WalkEntry[],
  recordAt: string,
) {
  return walkingList.map((entry) => ({
    startTime: `${recordAt}T${entry.startHour.padStart(2, '0')}:${entry.startMinute.padStart(2, '0')}:00`,
    endTime: `${recordAt}T${entry.endHour.padStart(2, '0')}:${entry.endMinute.padStart(2, '0')}:00`,
    pace: Number(entry.pace),
  }));
}
