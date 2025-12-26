import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  variant?: 'discount' | 'quality' | 'new' | 'bestSeller' | 'inStock' | 'lowStock' | 'outOfStock';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'new', children, className }) => {
  const variants = {
    discount: 'bg-red-500 text-white',
    quality: 'bg-accent text-white',
    new: 'bg-blue-500 text-white',
    bestSeller: 'bg-purple-500 text-white',
    inStock: 'bg-green-500 text-white',
    lowStock: 'bg-orange-500 text-white',
    outOfStock: 'bg-gray-500 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
