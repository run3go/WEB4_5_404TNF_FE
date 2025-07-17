import { getPetProfile, getPetProfiles } from '@/api/pet';
import { useQuery } from '@tanstack/react-query';

export const usePetProfiles = (userId: string, initialData?: PetProfile[]) => {
  return useQuery<PetProfile[]>({
    queryKey: ['pets', userId],
    queryFn: () => getPetProfiles(userId),
    staleTime: 30000,
    initialData,
  });
};

export const usePetProfile = (petId: number) => {
  return useQuery<PetProfile>({
    queryKey: ['pet', petId],
    queryFn: () => getPetProfile(petId),
    enabled: !petId,
    staleTime: 30000,
  });
};
