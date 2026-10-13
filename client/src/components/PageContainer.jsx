import React from 'react';

export const PageContainer = ({
  children,
  className = '',
  grid = false,
  maxWidth = 'max-w-7xl',
  ...props
}) => {
  return (
    <div className={`min-h-screen bg-[#F7F5EF] text-[#45433D] ${grid ? 'bg-subtle-grid' : ''}`}>
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
