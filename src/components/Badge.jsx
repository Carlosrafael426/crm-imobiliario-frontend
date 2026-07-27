import React from 'react';

const VARIANTS = {
  success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  warning: 'bg-amber-50 text-amber-600 border-amber-100',
  danger: 'bg-red-50 text-red-600 border-red-100',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
  primary: 'bg-primary/10 text-primary border-primary/20',
  action: 'bg-action/10 text-action border-action/20',
};

export default function Badge({ children, variant = 'neutral', icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${VARIANTS[variant] || VARIANTS.neutral} ${className}`}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
