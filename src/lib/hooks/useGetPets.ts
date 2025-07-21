import { getPets } from '@/api/schedule';
import { PetOption } from '@/types/schedule';
import { useQuery } from '@tanstack/react-query';

// 애완견 정보 조회
export const useGetPets = (userId?: number) => {
  return useQuery<PetProfile[], Error, PetOption[]>({
    queryKey: ['pets', userId],
    queryFn: () => getPets(userId!),
    retry: 0,
    enabled: !!userId,
    select: (pets) =>
      pets?.map((pet) => ({ label: pet.name, value: String(pet.petId) })),
  });
};
