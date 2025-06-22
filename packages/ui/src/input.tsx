import React, { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ElementType;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 text-gray-500" size={20} />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
            Icon ? "pl-10" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
