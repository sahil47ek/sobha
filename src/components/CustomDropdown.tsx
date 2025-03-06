'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'filter';
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  variant = 'default'
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const getVariantStyles = () => {
    switch (variant) {
      case 'filter':
        return 'bg-white border border-gray-200 text-sm font-medium shadow-sm';
      default:
        return 'bg-white border border-gray-300 text-base';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`
          w-full px-4 py-2.5 rounded-lg
          flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-primary/20
          transition-all duration-200
          ${getVariantStyles()}
          ${className}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={`
                w-full px-4 py-2 text-left
                hover:bg-gray-50 transition-colors duration-150
                ${option.value === value ? 'bg-primary/5 text-primary' : 'text-gray-700'}
                ${variant === 'filter' ? 'text-sm' : 'text-base'}
              `}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 