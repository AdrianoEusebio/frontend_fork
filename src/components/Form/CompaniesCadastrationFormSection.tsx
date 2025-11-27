import React from 'react';

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, icon}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-3">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
  );
};
