export type Pet = {
  petId: number;
  name: string;
  breed: string;
  age: number;
};

export type LifeRecordPayload = {
  petId: number;
  recordAt: string;
  content: string;
  sleepTime: number;
  weight: number;
  walkingList: {
    startTime: string;
    endTime: string;
    pace: number;
  }[];
  feedingList: {
    amount: number;
    mealtime: string;
    unit: string;
  }[];
};

export type WalkEntry = {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  pace: string;
};

export type FeedEntry = {
  amount: string;
  hour: string;
  minute: string;
  unit: string;
};
