import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71849A]/50 focus-visible:ring-offset-2 disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer transform-gpu active:scale-[0.98]';

  // Warm Editorial Palette: Slate blue primary, Greige/Oat secondary, Charcoal text
  const variants = {
    // Primary: Slate Blue #71849A, Text on dark buttons #F4EFE6, Hover #5E7086
    primary: 'bg-[#71849A] text-[#F4EFE6] font-medium hover:bg-[#5E7086] hover:shadow-md shadow-sm',
    // Secondary: Warm Oat surface #FAF7F2, Body text #45433D, Greige border #C4BEB2
    secondary: 'bg-[#FAF7F2] text-[#45433D] border border-[#C4BEB2] hover:bg-[#EDE6D9] hover:border-[#71849A] shadow-xs',
    // Ghost: Body text #45433D, hover Slate blue / interactive link #425B72
    ghost: 'bg-transparent text-[#45433D] hover:text-[#425B72] hover:bg-[#FAF7F2]',
    // Outline: Interactive link #425B72, Slate blue border, hover subtle tint
    outline: 'bg-transparent text-[#425B72] border border-[#71849A] hover:bg-[#71849A]/10',
    // Sage variant: Sage #78846A with #F4EFE6 text
    sage: 'bg-[#78846A] text-[#F4EFE6] font-medium hover:bg-[#667159] shadow-sm active:translate-y-px',
    // Wheat variant: Wheat #D5CBB9 with #35332F heading text
    wheat: 'bg-[#D5CBB9] text-[#35332F] font-medium hover:bg-[#C8BCAB] shadow-xs active:translate-y-px',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : IconLeft ? (
        <IconLeft className="w-4 h-4 shrink-0 text-current" />
      ) : null}
      <span>{children}</span>
      {!loading && IconRight && (
        <IconRight className="w-4 h-4 shrink-0 text-current" />
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
