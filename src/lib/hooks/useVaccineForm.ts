import { useForm } from 'react-hook-form';

export const useVaccineForm = (vaccineData: Vaccination[] | undefined) => {
  const defaultValue: VaccineFormValues = {
    DHPPL: { vaccineAt: undefined, vaccineType: 'FIRST', count: undefined },
    CORONAVIRUS: {
      vaccineAt: undefined,
      vaccineType: 'FIRST',
      count: undefined,
    },
    KENNEL_COUGH: {
      vaccineAt: undefined,
      vaccineType: 'FIRST',
      count: undefined,
    },
    INFLUENZA: { vaccineAt: undefined, vaccineType: 'FIRST', count: undefined },
    RABIES: { vaccineAt: undefined, vaccineType: 'FIRST', count: undefined },
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

  return methods;
};
