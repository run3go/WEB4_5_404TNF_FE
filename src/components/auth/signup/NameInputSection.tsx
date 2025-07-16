'use client';

import { validateName } from '@/lib/utils/validation';
import { useState } from 'react';

interface NameInputSectionProps {
  value: string;
  onChange: (name: string) => void;
}

export default function NameInputSection({
  value,
  onChange,
}: NameInputSectionProps) {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setError(validateName(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    if (touched) {
      setError(validateName(e.target.value.trim()));
    }
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="name"
        className="text-[14px] font-medium text-[#909090] sm:text-[15px]"
      >
        이름
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="이름을 입력해주세요"
        className={`auth__input focus:!border-[#FCC389] ${
          touched && error ? '!border-[var(--color-red)]' : ''
        }`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched && error && <p className="auth__error">{error}</p>}
    </div>
  );
}
