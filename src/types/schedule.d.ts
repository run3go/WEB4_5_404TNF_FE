type Schedule = {
  scheduleId: number;
  date: string;
  petId: number;
  petName: string;
  name: string;
  isDone: boolean;
  cycle: string;
  cycleEnd: string;
};

type CreateSchedule = {
  petId: number;
  name: string;
  date: string;
  cycle: string;
  cycleEnd: string;
};

type UpdateSchedule = {
  scheduleId: number;
  petId: number;
  name: string;
  date: string;
  cycleLink: boolean;
  cycle: string;
  cycleEnd: string;
};

type PetOption = { label: string; value: string };
