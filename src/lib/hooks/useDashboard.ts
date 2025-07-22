import {
  getDashboardChecklist,
  getDashboardFeeding,
  getDashboardNote,
  getDashboardProfile,
  getDashboardRecommend,
  getDashboardSleep,
  getDashboardWalking,
  getDashboardWeight,
} from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';

export const useDashboardData = (petId: number) => {
  const { data: profile, isLoading: isProfileLoading } =
    useQuery<DashboardProfile>({
      queryKey: ['dashboard', 'profile', petId],
      queryFn: () => getDashboardProfile(petId),
      staleTime: 30000,
    });

  const { data: weightList, isLoading: isWeightLoading } =
    useQuery<DashboardWeight>({
      queryKey: ['dashboard', 'weight', petId],
      queryFn: () => getDashboardWeight(petId),
      staleTime: 30000,
    });

  const { data: sleepList, isLoading: isSleepLoading } =
    useQuery<DashboardSleep>({
      queryKey: ['dashboard', 'sleep', petId],
      queryFn: () => getDashboardSleep(petId),
      staleTime: 30000,
    });

  const { data: note, isLoading: isNoteLoading } = useQuery<DashboardNote>({
    queryKey: ['dashboard', 'note', petId],
    queryFn: () => getDashboardNote(petId),
    staleTime: 30000,
  });

  const { data: recommend, isLoading: isRecommendLoading } = useQuery({
    queryKey: ['dashboard', 'recommend', petId],
    queryFn: () => getDashboardRecommend(petId),
    staleTime: 30000,
  });

  const { data: feeding, isLoading: isFeedingLoading } =
    useQuery<DashboardFeeding>({
      queryKey: ['dashboard', 'feeding', petId],
      queryFn: () => getDashboardFeeding(petId),
      staleTime: 30000,
    });

  const { data: walking, isLoading: isWalkingLoading } =
    useQuery<DashboardWalking>({
      queryKey: ['dashboard', 'walking', petId],
      queryFn: () => getDashboardWalking(petId),
      staleTime: 30000,
    });

  const { data: checklist, isLoading: isChecklistLoading } =
    useQuery<DashboardChecklist>({
      queryKey: ['dashboard', 'checklist', petId],
      queryFn: () => getDashboardChecklist(petId),
      staleTime: 30000,
    });

  const isLoading =
    isChecklistLoading &&
    isFeedingLoading &&
    isNoteLoading &&
    isProfileLoading &&
    isRecommendLoading &&
    isSleepLoading &&
    isWalkingLoading &&
    isWeightLoading;

  return {
    profile,
    weightList,
    sleepList,
    note,
    recommend,
    feeding,
    walking,
    checklist,
    isLoading,
  };
};
