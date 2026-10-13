import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({
  message = 'Loading analysis pipeline...',
  subtext = 'Processing feedback signals...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#C4BEB2] border-t-[#71849A] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#71849A]" />
        </div>
      </div>
      <p className="font-sans text-sm text-[#35332F] font-semibold">
        {message}
      </p>
      {subtext && (
        <p className="text-xs text-[#625D54] mt-1 font-sans">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default LoadingState;
