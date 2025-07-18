import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type GuideStore = {
  month: number;
  setMonth: (value: number) => void;
};

export const useGuideStore = create<GuideStore>()(
  devtools(
    immer((set) => ({
      month: 0,
      setMonth: (value) =>
        set((state) => {
          state.month = value;
        }),
    })),
  ),
);
