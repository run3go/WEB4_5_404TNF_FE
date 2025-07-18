import { getPetProfile, getPetProfiles, getVaccineData } from '@/api/pet';
import { useQuery } from '@tanstack/react-query';

export const usePetProfiles = (userId: string, initialData?: PetProfile[]) => {
  return useQuery<PetProfile[]>({
    queryKey: ['pets', userId],
    queryFn: () => getPetProfiles(userId),
    enabled: !!userId,
    staleTime: 30000,
    initialData,
  });
};

export const usePetProfile = (petId: number) => {
  return useQuery<PetProfile>({
    queryKey: ['pet', petId],
    queryFn: () => getPetProfile(petId),
    enabled: !!petId,
    staleTime: 30000,
  });
};

export const usePetVaccine = (petId: number) => {
  return useQuery<Vaccination[]>({
    queryKey: ['vaccine', petId],
    queryFn: () => getVaccineData(petId),
    enabled: !!petId,
    staleTime: 30000,
  });
};
