import { UseFormRegister, UseFormWatch } from 'react-hook-form';

export default function RadioGroupField({
  id,
  label,
  required = false,
  register,
  watch,
  options,
}: {
  id: 'size' | 'sex' | 'isNeutered';
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<PetPayload>;
  watch: UseFormWatch<PetPayload>;
  required?: boolean;
}) {
  return (
    <div className="mb-7">
      <label className="mb-2 block">
        {label}
        {required && <span className="text-[var(--color-red)]"> *</span>}
      </label>
      <div>
        {[
          options.map((option) => (
            <label key={option.value} htmlFor={option.label}>
              <span
                className={`profile-radio-style ${watch(id) === option.value && 'bg-[var(--color-primary-300)]'}`}
              >
                {option.label}
              </span>
              <input
                hidden
                type="radio"
                id={option.label}
                value={option.value}
                {...register(id)}
              />
            </label>
          )),
        ]}
      </div>
    </div>
  );
}
