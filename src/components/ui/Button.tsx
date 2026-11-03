'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 select-none rounded-none tracking-wide text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-6 py-3.5 gap-2.5',
    lg: 'text-base px-8 py-4 gap-3',
  };

  const variantStyles = {
    primary:
      'bg-copper text-ivory hover:bg-copper-600 active:scale-[0.98] shadow-sm hover:shadow-md',
    secondary:
      'bg-charcoal text-ivory hover:bg-charcoal-800 active:scale-[0.98]',
    outline:
      'border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5 active:scale-[0.98]',
    dark:
      'border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory/10 active:scale-[0.98]',
    ghost:
      'text-charcoal hover:text-copper hover:bg-charcoal/5 active:scale-[0.98]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    disabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${combinedClasses}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`group ${combinedClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`group ${combinedClasses}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}
