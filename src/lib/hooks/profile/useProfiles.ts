import { getPetProfile, getPetProfiles, getVaccineData } from '@/api/pet';
import { getMyUserInfo, modifyUserInfo } from '@/api/user';
import { Toast } from '@/components/common/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useModifyUserMutation = (
  userInfo: User | null,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formdata: UserFormdata) => modifyUserInfo(formdata),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['user', String(userInfo?.userId)],
      });
      onClose();
      Toast.success('유저 정보가 수정되었습니다!');
    },
    onError: () => {
      Toast.error('유저 정보 수정에 실패했습니다!');
    },
  });
};
