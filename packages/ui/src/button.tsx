"use client";

// import { ReactNode } from "react";

// interface ButtonProps {
//   variant:"primary"|"secondary"|"outlined";
//   className?: string;
//   onClick: ()=>void;
//   size:"lg"|"sm";
//   children:ReactNode;
// }

// export const Button = ({ size,variant,className,onClick,children }: ButtonProps) => {
//   return (
//     <button
//       className={`${className} 
//         ${variant ==="primary" ?"bg-primary": variant == "secondary"? "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500":"border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500"}
//         ${size==="lg"?"px-4 py-2":"px-2 py-1"}`}  
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Spinner = ({ className = '', size = 20 }: { className?: string; size?: number }) => (
  <svg
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.75V6.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.1266 6.87347L16.0659 7.93413"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.25 12L17.75 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.1266 17.1265L16.0659 16.0659"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19.25V17.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87347 17.1265L7.93413 16.0659"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.75 12L6.25 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.87347 6.87347L7.93413 7.93413"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-3',
    };

    const spinnerSizes = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Spinner className="-ml-1" size={spinnerSizes[size]} />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;