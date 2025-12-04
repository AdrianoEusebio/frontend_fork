import { InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  options: RadioOption[];
  error?: string;
}

export const Radio = ({ label, options, error, name, ...props }: RadioProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-gray-700 font-medium">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              {...props}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
