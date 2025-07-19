export type Schedule = {
  scheduleId: number;
  date: string;
  petId: number;
  petName: string;
  name: string;
  isDone: boolean;
  cycle: string;
  cycleEnd: string;
};

export type CreateSchedule = {
  name: string;
  date: string;
  cycle: string;
  cycleEnd: string;
  userId: number;
  petId: number;
};

export type DeleteSchedule = {
  petId: number;
  userId: number;
  scheduleId: number;
  cycleLink: boolean;
};

export type UpdateSchedule = {
  scheduleId: number;
  userId: number;
  petId: number;
  name: string;
  date: string;
  cycleLink: boolean;
  cycle: string;
  cycleEnd: string;
};

export type PetOption = { label: string; value: string };
