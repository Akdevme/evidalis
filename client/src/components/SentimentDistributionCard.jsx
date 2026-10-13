import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { Smile, Meh, Frown, Filter } from 'lucide-react';

export const SentimentDistributionCard = ({
  reviews = [],
  onSelectSentiment,
  selectedSentiment,
}) => {
  // Calculate sentiment totals
  const stats = React.useMemo(() => {
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    reviews.forEach((r) => {
      const s = r.sentiment?.toLowerCase() || 'neutral';
      if (s === 'positive') positive++;
      else if (s === 'negative') negative++;
      else neutral++;
    });

    const total = reviews.length || 1;
    return {
      positive,
      neutral,
      negative,
      posPct: Math.round((positive / total) * 100),
      neuPct: Math.round((neutral / total) * 100),
      negPct: Math.round((negative / total) * 100),
    };
  }, [reviews]);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#C4BEB2]/50 gap-2">
        <div>
          <span className="font-sans text-xs font-semibold text-[#425B72] uppercase tracking-wider block">
            SENTIMENT DISTRIBUTION
          </span>
          <p className="text-xs text-[#625D54] mt-0.5">
            Sentiment polarity breakdown across active dataset pool
          </p>
        </div>

        {selectedSentiment && selectedSentiment !== 'all' && (
          <button
            onClick={() => onSelectSentiment('all')}
            className="text-xs font-sans text-[#425B72] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Clear Sentiment Filter
          </button>
        )}
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="h-3 w-full rounded-full bg-[#FAF7F2] overflow-hidden flex mb-4 border border-[#C4BEB2]">
        <div
          style={{ width: `${stats.negPct}%` }}
          className="h-full bg-[#C62828] transition-all duration-300"
          title={`Negative: ${stats.negPct}%`}
        />
        <div
          style={{ width: `${stats.neuPct}%` }}
          className="h-full bg-[#C4BEB2] transition-all duration-300"
          title={`Neutral: ${stats.neuPct}%`}
        />
        <div
          style={{ width: `${stats.posPct}%` }}
          className="h-full bg-[#2E7D32] transition-all duration-300"
          title={`Positive: ${stats.posPct}%`}
        />
      </div>

      {/* 3 Clickable Sentiment Metric Tiles */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        <button
          onClick={() => onSelectSentiment(selectedSentiment === 'negative' ? 'all' : 'negative')}
          className={`p-2 sm:p-3 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
            selectedSentiment === 'negative'
              ? 'bg-[#FDF2F2] border-[#C62828]'
              : 'bg-[#FAF7F2] border-[#C4BEB2] hover:border-[#C62828]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-xs text-[#625D54] flex items-center gap-1 font-medium truncate">
              <Frown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C62828] shrink-0" />
              Negative
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold text-[#C62828]">{stats.negPct}%</span>
          </div>
          <div className="font-sans text-xs sm:text-sm font-semibold text-[#35332F]">
            {stats.negative.toLocaleString()} <span className="hidden sm:inline text-xs text-[#6B655B] font-normal">entries</span>
          </div>
        </button>

        <button
          onClick={() => onSelectSentiment(selectedSentiment === 'neutral' ? 'all' : 'neutral')}
          className={`p-2 sm:p-3 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
            selectedSentiment === 'neutral'
              ? 'bg-[#ECECEC] border-[#71849A]'
              : 'bg-[#FAF7F2] border-[#C4BEB2] hover:border-[#71849A]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-xs text-[#625D54] flex items-center gap-1 font-medium truncate">
              <Meh className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B655B] shrink-0" />
              Neutral
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold text-[#625D54]">{stats.neuPct}%</span>
          </div>
          <div className="font-sans text-xs sm:text-sm font-semibold text-[#35332F]">
            {stats.neutral.toLocaleString()} <span className="hidden sm:inline text-xs text-[#6B655B] font-normal">entries</span>
          </div>
        </button>

        <button
          onClick={() => onSelectSentiment(selectedSentiment === 'positive' ? 'all' : 'positive')}
          className={`p-2 sm:p-3 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
            selectedSentiment === 'positive'
              ? 'bg-[#F0FDF4] border-[#2E7D32]'
              : 'bg-[#FAF7F2] border-[#C4BEB2] hover:border-[#2E7D32]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-xs text-[#625D54] flex items-center gap-1 font-medium truncate">
              <Smile className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2E7D32] shrink-0" />
              Positive
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold text-[#2E7D32]">{stats.posPct}%</span>
          </div>
          <div className="font-sans text-xs sm:text-sm font-semibold text-[#35332F]">
            {stats.positive.toLocaleString()} <span className="hidden sm:inline text-xs text-[#6B655B] font-normal">entries</span>
          </div>
        </button>
      </div>
    </Card>
  );
};

export default SentimentDistributionCard;
