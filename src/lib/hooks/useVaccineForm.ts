import { modifyVaccineData } from '@/api/pet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const useVaccineForm = (vaccineData: Vaccination[] | undefined) => {
  const info: VaccineInfo = {
    vaccineAt: undefined,
    vaccineType: 'FIRST',
    count: undefined,
  };
  const defaultValue: VaccineFormValues = {
    DHPPL: info,
    CORONAVIRUS: info,
    KENNEL_COUGH: info,
    INFLUENZA: info,
    RABIES: info,
  };
  const fetchData: VaccineFormValues | Record<string, unknown> = {};
  vaccineData?.forEach((data) => {
    fetchData[data.vaccine.name] = {
      vaccineAt: data.vaccineAt,
      vaccineType: data.vaccineType,
      count: data.count,
    };
  });
  const methods = useForm<VaccineFormValues>({
    defaultValues: vaccineData
      ? { ...defaultValue, ...fetchData }
      : defaultValue,
  });

  const reset = (data: Vaccination[]) => {
    methods.setValue(
      'DHPPL',
      data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
    );
    methods.setValue(
      'CORONAVIRUS',
      data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
    );
    methods.setValue(
      'KENNEL_COUGH',
      data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
    );
    methods.setValue(
      'INFLUENZA',
      data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
    );
    methods.setValue(
      'RABIES',
      data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
    );
  };

  return { methods, reset };
};

export const useVaccineMutation = (petId: number, onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      petId,
    }: {
      payload: VaccinePayload[];
      petId: number;
    }) => modifyVaccineData(payload, petId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vaccine', petId] });
      onClose();
    },
  });
};
