import React from 'react';
import Card from './Card';
import { Database } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Database,
  title = 'No Data Available',
  description = 'No customer feedback has been loaded yet. Import a dataset to generate evidence clusters and insights.',
  action,
  className = '',
}) => {
  return (
    <Card className={`p-8 sm:p-12 text-center border-dashed ${className}`}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] mb-4 shadow-xs">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#35332F] mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#625D54] max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </Card>
  );
};

export default EmptyState;
