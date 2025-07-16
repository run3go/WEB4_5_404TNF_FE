import { formatDate } from 'date-fns';
import { Control, Controller } from 'react-hook-form';
import DateInput from '../common/DateInput';

export default function DateField({
  id,
  label,
  control,
  required = false,
}: {
  id: 'birthday' | 'metday';
  label: string;
  control: Control<PetFormValues, unknown, PetFormValues>;
  required?: boolean;
}) {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div className="mb-7">
          <label className="mb-2 block">
            {label}
            {required && <span className="text-[var(--color-red)]"> *</span>}
          </label>
          <DateInput
            className="w-full rounded-[12px] border-1 border-[var(--color-primary-300)]"
            disableFuture
            selected={new Date(field.value)}
            setSelected={(value) =>
              field.onChange(formatDate(value, 'yyyy-MM-dd'))
            }
          />
        </div>
      )}
    ></Controller>
  );
}
