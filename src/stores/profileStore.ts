import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ProfileStore = {
  isEditingPet: boolean;
  isEditingUser: boolean;
  petProfiles: PetProfile[];
  selectedProfile: PetProfile | null;
  toggleEditingPetProfile: () => void;
  toggleEditingUserProfile: () => void;
  setPetProfiles: (data: PetProfile[]) => void;
  addPetProfile: (newProfile: PetProfile) => void;
  selectProfile: (profile: PetProfile | null) => void;
};

export const useProfileStore = create<ProfileStore>()(
  devtools(
    immer((set) => ({
      isEditingPet: false,
      isEditingUser: false,
      selectedProfile: null,
      petProfiles: [],
      toggleEditingPetProfile: () =>
        set((state) => {
          state.isEditingPet = !state.isEditingPet;
        }),
      toggleEditingUserProfile: () =>
        set((state) => {
          state.isEditingUser = !state.isEditingUser;
        }),
      setPetProfiles: (data) =>
        set((state) => {
          state.petProfiles = data;
        }),
      addPetProfile: (newProfile) =>
        set((state) => {
          state.petProfiles.push(newProfile);
        }),
      selectProfile: (profile) =>
        set((state) => {
          state.selectedProfile = profile;
        }),
    })),
  ),
);
