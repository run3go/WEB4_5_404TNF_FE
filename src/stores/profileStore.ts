import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ProfileStore = {
  isEditingPet: boolean;
  isEditingUser: boolean;
  selectedPet: number | null;
  toggleEditingPetProfile: () => void;
  toggleEditingUserProfile: () => void;
  selectPet: (petId: number | null) => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    immer((set) => ({
      isEditingPet: false,
      isEditingUser: false,
      selectedPet: null,
      toggleEditingPetProfile: () =>
        set((state) => {
          state.isEditingPet = !state.isEditingPet;
        }),
      toggleEditingUserProfile: () =>
        set((state) => {
          state.isEditingUser = !state.isEditingUser;
        }),
      selectPet: (petId) =>
        set((state) => {
          state.selectedPet = petId;
        }),
    })),
  ),
);
