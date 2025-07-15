import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ProfileStore = {
  isEditingPetProfile: boolean;
  isEditingUserProfile: boolean;
  toggleEditingPetProfile: () => void;
  toggleEditingUserProfile: () => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    immer((set) => ({
      isEditingPetProfile: false,
      isEditingUserProfile: false,
      toggleEditingPetProfile: () =>
        set((state) => {
          state.isEditingPetProfile = !state.isEditingPetProfile;
        }),
      toggleEditingUserProfile: () =>
        set((state) => {
          state.isEditingUserProfile = !state.isEditingUserProfile;
        }),
    })),
  ),
);
