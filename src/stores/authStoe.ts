import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthStore {
  isLogin: boolean;
  userInfo: User | null;
  setLogin: (userInfo: User) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      isLogin: false,
      userInfo: null,
      setLogin: (userInfo: User) =>
        set((state) => {
          state.isLogin = true;
          state.userInfo = userInfo;
        }),
      setLogout: () =>
        set((state) => {
          state.isLogin = false;
          state.userInfo = null;
        }),
    })),
  ),
);
