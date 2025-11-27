import React from 'react';

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  active = true,
  onClick
}) => {
  return (
    <div
      className={`flex flex-col items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
          active ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
};
