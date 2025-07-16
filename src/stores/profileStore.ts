import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ProfileStore = {
  isEditingPetProfile: boolean;
  isEditingUserProfile: boolean;
  petProfiles: PetProfile[];
  toggleEditingPetProfile: () => void;
  toggleEditingUserProfile: () => void;
  setPetProfiles: (data: PetProfile[]) => void;
  addPetProfile: (newProfile: PetProfile) => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    immer((set) => ({
      isEditingPetProfile: false,
      isEditingUserProfile: false,
      petProfiles: [],
      toggleEditingPetProfile: () =>
        set((state) => {
          state.isEditingPetProfile = !state.isEditingPetProfile;
        }),
      toggleEditingUserProfile: () =>
        set((state) => {
          state.isEditingUserProfile = !state.isEditingUserProfile;
        }),
      setPetProfiles: (data) =>
        set((state) => {
          state.petProfiles = data;
        }),
      addPetProfile: (newProfile) =>
        set((state) => {
          state.petProfiles.push(newProfile);
        }),
    })),
  ),
);
