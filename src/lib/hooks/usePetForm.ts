import { modifyPetProfile, registPetProfile } from '@/api/pet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { petProfileSchema } from '../utils/petProfile.schema';

export const usePetForm = () => {
  const { handleSubmit, register, watch, reset, control } =
    useForm<PetFormValues>({
      resolver: zodResolver(petProfileSchema),
      defaultValues: {
        image: null,
        name: '',
        breed: 'GREAT_DANE',
        metday: formatDate(new Date(), 'yyyy-MM-dd'),
        birthday: formatDate(new Date(), 'yyyy-MM-dd'),
        size: undefined,
        isNeutered: undefined,
        sex: undefined,
        registNumber: '',
        weight: '',
      },
    });
  return { handleSubmit, register, watch, reset, control };
};

export const useRegistMutation = (
  userInfo: User | null,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PetPayload) =>
      registPetProfile({ ...payload, userId: String(userInfo?.userId) }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pets', String(userInfo?.userId)],
      });
      onClose();
    },
    onError: () => {
      console.error('반려견 등록에 실패했습니다');
    },
  });
};

export const useModifyMutation = (
  userInfo: User | null,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, petId }: { payload: PetPayload; petId: number }) =>
      modifyPetProfile(payload, petId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pets', String(userInfo?.userId)],
      });
      onClose();
    },
    onError: (e) => {
      console.error('반려견 수정에 실패했습니다', e);
    },
  });
};
