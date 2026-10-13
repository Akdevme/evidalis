import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-xl bg-[#ECECEC] border border-[#C4BEB2] shadow-[0_2px_10px_rgba(69,70,65,0.06)]
        ${glass ? 'backdrop-blur-md bg-[#ECECEC]/90' : ''}
        ${hoverEffect ? 'hover:border-[#71849A] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(69,70,65,0.12)] transition-all duration-200 ease-out transform-gpu' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-5 sm:p-6 border-b border-[#C4BEB2]/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base sm:text-lg font-semibold text-[#35332F] tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs sm:text-sm text-[#625D54] mt-1 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-5 sm:p-6 border-t border-[#C4BEB2]/50 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
