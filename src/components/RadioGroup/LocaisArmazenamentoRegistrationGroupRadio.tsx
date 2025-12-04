import { InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  label?: string;
  options: RadioOption[];
  required?: boolean;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  label,
  options,
  required,
  name,
  value,
  onChange,
  className = '',
  ...props
}: RadioGroupProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              {...props}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
