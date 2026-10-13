import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { ArrowRight, Flame } from 'lucide-react';
import { RECURRING_TOPICS } from '../lib/datasetLoader';

export const RecurringTopicsRadar = ({ onSelectTopic, selectedClusterId, totalCount }) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-[#C4BEB2]/50 gap-2.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shadow-xs">
            <Flame className="w-4 h-4 text-[#71849A]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-[#35332F]">
              Frequently Reported Customer Themes
            </h3>
            <p className="text-xs text-[#625D54]">
              AI-discovered topics across {totalCount ? `${totalCount.toLocaleString()} reviews` : 'dataset pool'} &bull; Click any theme to view reviews
            </p>
          </div>
        </div>

        <Badge variant="slate" size="sm">
          AI Discovered
        </Badge>
      </div>

      {/* Grid of Recurring Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {RECURRING_TOPICS.map((topic) => {
          const isSelected = selectedClusterId === topic.clusterId;
          const isCritical = topic.severity === 'Critical';
          const isHigh = topic.severity === 'High';
          const isPositive = topic.severity === 'Positive';

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.clusterId, topic.category)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                isSelected
                  ? 'bg-[#ECECEC] border-[#71849A] shadow-md ring-1 ring-[#71849A]'
                  : 'bg-[#FAF7F2] border-[#C4BEB2] hover:border-[#71849A] hover:bg-[#ECECEC]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant={isCritical ? 'danger' : isHigh ? 'warning' : isPositive ? 'success' : 'slate'} size="sm">
                      {topic.clusterId}
                    </Badge>
                    <span className="text-xs text-[#6B655B] font-medium truncate max-w-[120px]">{topic.category}</span>
                  </div>

                  <span className={`text-xs font-semibold ${isCritical ? 'text-[#C62828]' : isPositive ? 'text-[#2E7D32]' : 'text-[#996515]'}`}>
                    {topic.trend}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-[#35332F] mb-1.5 leading-snug group-hover:text-[#425B72] transition-colors">
                  {topic.keyword}
                </h4>

                <p className="text-xs text-[#45433D] line-clamp-2 leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C4BEB2]/50 flex items-center justify-between text-xs">
                <span className="text-[#6B655B]">
                  <strong className="text-[#35332F] font-semibold">{topic.volume.toLocaleString()}</strong> reviews
                </span>

                <span className="text-[#425B72] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>View Feedback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecurringTopicsRadar;
