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

export const useDashboardProfile = (petId: number) => {
  return useQuery<DashboardProfile>({
    queryKey: ['dashboard', 'profile', petId],
    queryFn: () => getDashboardProfile(petId),
    staleTime: 30000,
  });
};

export const useDashboardWeight = (petId: number) => {
  return useQuery<DashboardWeight>({
    queryKey: ['dashboard', 'weight', petId],
    queryFn: () => getDashboardWeight(petId),
    staleTime: 30000,
  });
};

export const useDashboardSleep = (petId: number) => {
  return useQuery<DashboardSleep>({
    queryKey: ['dashboard', 'sleep', petId],
    queryFn: () => getDashboardSleep(petId),
    staleTime: 30000,
  });
};

export const useDashboardNote = (petId: number) => {
  return useQuery<DashboardNote>({
    queryKey: ['dashboard', 'note', petId],
    queryFn: () => getDashboardNote(petId),
    staleTime: 30000,
  });
};

export const useDashboardRecommend = (petId: number) => {
  return useQuery({
    queryKey: ['dashboard', 'recommend', petId],
    queryFn: () => getDashboardRecommend(petId),
    staleTime: 30000,
  });
};

export const useDashboardFeeding = (petId: number) => {
  return useQuery<DashboardFeeding>({
    queryKey: ['dashboard', 'feeding', petId],
    queryFn: () => getDashboardFeeding(petId),
    staleTime: 30000,
  });
};

export const useDashboardWalking = (petId: number) => {
  return useQuery<DashboardWalking>({
    queryKey: ['dashboard', 'walking', petId],
    queryFn: () => getDashboardWalking(petId),
    staleTime: 30000,
  });
};

export const useDashboardChecklist = (petId: number) => {
  return useQuery<DashboardChecklist>({
    queryKey: ['dashboard', 'checklist', petId],
    queryFn: () => getDashboardChecklist(petId),
    staleTime: 30000,
  });
};
