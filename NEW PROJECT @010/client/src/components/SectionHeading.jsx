import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 sm:mb-12 ${isCenter ? 'text-center' : ''} ${className}`}>
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${isCenter ? 'items-center justify-center' : ''}`}>
        <div className={isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'}>
          {eyebrow && (
            <div className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#425B72] uppercase tracking-wider mb-2">
              <span className="text-[#C4BEB2]">&bull;</span>
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#35332F]">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-[#625D54] leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="shrink-0 mt-2 sm:mt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
