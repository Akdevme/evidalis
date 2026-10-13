import React from 'react';
import Card from './Card';
import Badge from './Badge';

export const MetricCard = ({
  label,
  value,
  secondaryValue,
  trend,
  trendPositive = true,
  icon: Icon,
  badge,
  disclaimer,
  className = '',
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={`p-3.5 sm:p-5 relative overflow-hidden group transition-all duration-300 hover:border-[#71849A] hover:-translate-y-0.5 hover:shadow-card-elevated ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
      hoverEffect={true}
    >
      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-2.5">
        <span className="font-sans text-xs sm:text-sm font-semibold text-[#625D54] leading-tight">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shrink-0 group-hover:border-[#71849A] group-hover:bg-[#EDE6D9] transition-all shadow-xs">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#35332F]">
          {value}
        </span>
        {secondaryValue && (
          <span className="text-[10px] sm:text-xs text-[#6B655B] font-normal uppercase tracking-wider">
            {secondaryValue}
          </span>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-xs">
        {trend && (
          <span className={`font-semibold ${trendPositive ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
            {trend}
          </span>
        )}
        {badge && (
          <Badge variant={badge.variant || 'neutral'} size="sm" className="text-[10px] sm:text-xs px-1.5 py-0.5">
            {badge.text}
          </Badge>
        )}
        {disclaimer && (
          <span className="text-[10px] sm:text-[11px] text-[#6B655B]">
            {disclaimer}
          </span>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;
