import { useQuery } from '@tanstack/react-query';
import { getPetsByUserId } from '@/api/diary';

export const useGetPets = (userId: number | null) => {
  return useQuery<DiaryPet[]>({
    queryKey: ['pets', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return getPetsByUserId(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
