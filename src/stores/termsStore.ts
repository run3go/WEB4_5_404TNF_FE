import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TermsStore {
  isAgreeTerms: boolean;
  setAgree: () => void;
  setDisagree: () => void;
}

export const useTermsStore = create<TermsStore>()(
  devtools(
    immer((set) => ({
      isAgreeTerms: false,
      setAgree: () =>
        set((state) => {
          state.isAgreeTerms = true;
        }),
      setDisagree: () =>
        set((state) => {
          state.isAgreeTerms = false;
        }),
    })),
  ),
);
