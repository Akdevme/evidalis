/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React, { useState } from 'react';
import Badge from './Badge';
import {
  GitPullRequest,
  Copy,
  Check,
  Smile,
  Meh,
  Frown,
  ArrowRight,
  User,
  Clock,
  Layers,
} from 'lucide-react';

// Helper to format customer ID nicely
const formatCustomerName = (id) => {
  if (!id) return 'Customer';
  if (id.startsWith('usr_')) {
    return `Customer #${id.replace('usr_', '')}`;
  }
  return id;
};

export const FeedbackCardView = ({
  rows = [],
  onSelectCluster,
  onOpenDevTicket,
}) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyQuote = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (rows.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-[#6B655B] bg-[#ECECEC] rounded-xl border border-[#C4BEB2]">
        No customer feedback matches the selected filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {rows.map((row, idx) => {
        const text = row.review || row.feedback_text || '';
        const sentiment = row.sentiment?.toLowerCase() || 'neutral';
        const isCopied = copiedId === (row._id || idx);
        const customerName = formatCustomerName(row.customer_id);

        return (
          <div
            key={row._id || idx}
            className="p-3.5 sm:p-4 rounded-xl bg-[#ECECEC] border border-[#C4BEB2] hover:border-[#71849A] transition-all flex flex-col justify-between gap-3 shadow-xs hover:shadow-sm overflow-hidden"
          >
            <div>
              {/* Card Header: Customer & Meta */}
              <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-[#EAE4D7]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#C4BEB2] text-[#425B72] flex items-center justify-center text-[10px] font-bold shrink-0">
                    {customerName.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-[#35332F] truncate">{customerName}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Sentiment Pill */}
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      sentiment === 'positive'
                        ? 'bg-[#EAF3EA] text-[#2E7D32] border-[#C8E6C9]'
                        : sentiment === 'negative'
                        ? 'bg-[#FDF2F2] text-[#C62828] border-[#F8D7DA]'
                        : 'bg-[#FAF7F2] text-[#625D54] border-[#E2D9CA]'
                    }`}
                  >
                    {sentiment === 'positive' ? (
                      <Smile className="w-3 h-3 text-[#2E7D32]" />
                    ) : sentiment === 'negative' ? (
                      <Frown className="w-3 h-3 text-[#C62828]" />
                    ) : (
                      <Meh className="w-3 h-3 text-[#625D54]" />
                    )}
                    <span className="capitalize">{sentiment === 'negative' ? 'Attention' : sentiment}</span>
                  </span>

                  {/* Urgency Badge */}
                  <Badge
                    variant={row.urgency === 'high' ? 'danger' : row.urgency === 'medium' ? 'warning' : 'neutral'}
                    size="sm"
                    className="text-[10px] px-1.5 py-0.2"
                  >
                    {row.urgency === 'high' ? 'Critical' : row.urgency === 'medium' ? 'Med' : 'Low'}
                  </Badge>
                </div>
              </div>

              {/* Category & Cluster Row */}
              <div className="flex items-center flex-wrap gap-1.5 mb-2.5">
                <span className="text-xs text-[#35332F] bg-[#FAF7F2] px-2.5 py-0.5 rounded font-medium border border-[#C4BEB2]">
                  {row.category}
                </span>

                <button
                  onClick={() => onSelectCluster && onSelectCluster(row.cluster_id)}
                  className="cursor-pointer"
                  title="Click to view all reviews in this topic"
                >
                  <Badge variant="slate" size="sm">
                    {row.cluster_id}
                  </Badge>
                </button>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-[13px] text-[#45433D] leading-relaxed line-clamp-4">
                &ldquo;{text}&rdquo;
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2.5 border-t border-[#EAE4D7] flex items-center justify-between text-xs">
              <span className="text-[#6B655B] flex items-center gap-1 text-[11px] font-medium">
                <Clock className="w-3 h-3 text-[#6B655B]" />
                {new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyQuote(row._id || idx, text)}
                  className="text-[#6B655B] hover:text-[#425B72] transition-colors p-1 rounded hover:bg-[#FAF7F2] cursor-pointer flex items-center gap-1 text-[11px] font-medium"
                  title="Copy customer quote"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Quote'}</span>
                </button>

                <button
                  onClick={() => onOpenDevTicket && onOpenDevTicket({ id: row.cluster_id, name: row.cluster, category: row.category, urgency: row.urgency })}
                  className="text-[#425B72] hover:text-[#35332F] hover:underline flex items-center gap-1 cursor-pointer text-[11px] font-semibold"
                  title="Create Action Item / Dev Ticket"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-[#425B72]" />
                  <span>Action</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedbackCardView;
