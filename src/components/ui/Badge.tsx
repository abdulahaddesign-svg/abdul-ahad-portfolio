import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'copper' | 'charcoal' | 'ivory' | 'sage' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'copper', className = '' }: BadgeProps) {
  const variantStyles = {
    copper: 'bg-copper/10 text-copper border border-copper/30',
    charcoal: 'bg-charcoal text-ivory border border-charcoal-700',
    ivory: 'bg-ivory text-charcoal border border-charcoal/15',
    sage: 'bg-sage/15 text-sage-700 border border-sage/40',
    outline: 'bg-transparent text-charcoal-600 border border-charcoal/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-sans font-semibold tracking-wider uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
