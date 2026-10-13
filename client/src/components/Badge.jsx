import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className = '',
  ...props
}) => {
  const variants = {
    // Slate blue (Product / Primary topics)
    slate: 'bg-[#71849A]/15 text-[#425B72] border-[#71849A]/30',
    // Sage (Earthy / secondary topics)
    sage: 'bg-[#78846A]/15 text-[#4A573F] border-[#78846A]/35',
    // Wheat (Warm neutral)
    wheat: 'bg-[#D5CBB9]/40 text-[#45433D] border-[#C4BEB2]',
    // Neutral (Greige on Oat)
    neutral: 'bg-[#FAF7F2] text-[#625D54] border-[#C4BEB2]',
    // Success (Semantic Green)
    success: 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]',
    // Warning (Warm Amber)
    warning: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
    // Danger (Semantic Red)
    danger: 'bg-[#FDF2F2] text-[#B91C1C] border-[#FCA5A5]',

    // Aliases for backwards compatibility:
    acid: 'bg-[#71849A]/15 text-[#425B72] border-[#71849A]/30',
    mint: 'bg-[#71849A]/15 text-[#425B72] border-[#71849A]/30',
    emerald: 'bg-[#78846A]/15 text-[#4A573F] border-[#78846A]/35',
  };

  const dots = {
    slate: 'bg-[#71849A]',
    sage: 'bg-[#78846A]',
    wheat: 'bg-[#B8AB94]',
    neutral: 'bg-[#686A63]',
    success: 'bg-[#15803D]',
    warning: 'bg-[#D97706]',
    danger: 'bg-[#DC2626]',
    acid: 'bg-[#71849A]',
    mint: 'bg-[#71849A]',
    emerald: 'bg-[#78846A]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1.5',
    md: 'text-xs px-2.5 py-1 font-medium gap-2',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-sans font-medium tracking-normal
        ${variants[variant] || variants.neutral}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dots[variant] || dots.neutral}`} />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
