
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MD3Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-[#1C1B1F] rounded-[24px] p-4 material-shadow transition-transform active:scale-[0.98] ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'tonal' | 'text';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const MD3Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'filled', 
  onClick, 
  className = '', 
  disabled 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2";
  
  const variants = {
    filled: "bg-[#6750A4] text-white hover:bg-[#5a4590] shadow-sm",
    tonal: "bg-[#EADDFF] text-[#21005D] hover:bg-[#d8cceb]",
    outlined: "border border-[#79747E] text-[#6750A4] hover:bg-slate-50 dark:hover:bg-slate-900",
    text: "text-[#6750A4] hover:bg-slate-50 dark:hover:bg-slate-900"
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}

export const MD3Input: React.FC<InputProps> = ({ label, value, onChange, type = 'text', placeholder, error }) => (
  <div className="w-full group">
    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 ml-4 transition-colors group-focus-within:text-[#6750A4]">
      {label}
    </label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-slate-100 dark:bg-[#2B2930] border-b-2 border-slate-300 dark:border-slate-700 px-4 py-3 rounded-t-xl focus:outline-none focus:border-[#6750A4] transition-all dark:text-white ${error ? 'border-red-500' : ''}`}
    />
    {error && <span className="text-xs text-red-500 mt-1 ml-4">{error}</span>}
  </div>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`}></div>
);
