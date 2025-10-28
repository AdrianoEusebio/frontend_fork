import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full"
  >
    {text}
  </button>
);
