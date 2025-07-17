import { useForm } from 'react-hook-form';

export const useVaccineForm = (vaccineData: Vaccination[] | undefined) => {
  //   const today = formatDate(new Date(), 'yyyy-MM-dd');
  const defaultValue: VaccineFormValues = {
    DHPPL: { vaccineAt: '', vaccineType: 'FIRST', count: undefined },
    CORONAVIRUS: {
      vaccineAt: '',
      vaccineType: 'FIRST',
      count: undefined,
    },
    KENNEL_COUGH: {
      vaccineAt: '',
      vaccineType: 'FIRST',
      count: undefined,
    },
    INFLUENZA: { vaccineAt: '', vaccineType: 'FIRST', count: undefined },
    RABIES: { vaccineAt: '', vaccineType: 'FIRST', count: undefined },
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
