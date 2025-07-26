import { getPetProfile, getPetProfiles, getVaccineData } from '@/api/pet';
import { getMyUserInfo } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const usePetProfiles = (userId: string, initialData?: PetProfile[]) => {
  return useQuery<PetProfile[]>({
    queryKey: ['pets', userId],
    queryFn: () => getPetProfiles(userId),
    enabled: !!userId,
    staleTime: 300000,
    initialData,
  });
};

export const usePetProfile = (petId: number, isMyProfile: boolean) => {
  return useQuery<PetProfile>({
    queryKey: ['pet', petId],
    queryFn: () => getPetProfile(petId),
    enabled: !!petId && isMyProfile,
    staleTime: 300000,
  });
};

export const usePetVaccine = (petId: number, isMyProfile: boolean) => {
  return useQuery<Vaccination[]>({
    queryKey: ['vaccine', petId],
    queryFn: () => getVaccineData(petId),
    enabled: !!petId && isMyProfile,
    staleTime: 300000,
  });
};

export const useUserProfile = (userId: string, isMyProfile: boolean) => {
  return useQuery<UserProfile>({
    queryFn: () => getMyUserInfo(),
    queryKey: ['user', userId],
    enabled: isMyProfile,
    staleTime: 300000,
  });
};
