type DashboardProfile = {
  name: string;
  breed: PetBreed;
  metDay: string;
  aiAnalysis: string | null;
};

type DashboardWeight = { date: string; weight: number }[];

type DashboardSleep = { date: string; sleep: number }[];

type DashboardNote = {
  date: string;
  content: string;
};

type DashboardFeeding = {
  date: string;
  amount: number;
  average: number;
  unit: stirng;
};
