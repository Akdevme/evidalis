import React from 'react';

export const BrandLogo = ({
  size = 'md',
  markOnly = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Evidalis Evidence & Analysis Custom Mark in Slate Blue & Soft Oat */}
      <div className={`relative ${iconSizes[size] || iconSizes.md} rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] flex items-center justify-center shrink-0 shadow-sm text-[#425B72] hover:border-[#71849A] transition-colors`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#425B72]"
        >
          <path d="M15 13h-5" />
          <path d="M15 9h-5" />
          <path d="M19 17V5a2 2 0 00-2-2H4" />
          <path d="m22 12-5-4" />
          <path d="M8 21h12a2 2 0 002-2v-1a1 1 0 00-1-1H11a1 1 0 00-1 1v1a2 2 0 11-4 0V5a2 2 0 10-4 0v2a1 1 0 001 1h3" />
          <circle cx="14" cy="5.5" r="4" />
        </svg>
      </div>

      {!markOnly && (
        <div className="flex items-center gap-2">
          <span className={`font-semibold tracking-wide font-wordmark text-[#35332F] ${textSizes[size] || textSizes.md}`}>
            Evidalis
          </span>
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#71849A]/15 text-[#425B72] border border-[#71849A]/30">
            AI
          </span>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
