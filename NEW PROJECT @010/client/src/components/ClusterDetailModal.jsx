import React from 'react';
import { X, GitPullRequest, AlertCircle, CheckCircle2, Clock, ShieldAlert, Cpu, ArrowRight, Quote, Share2 } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import { formatCurrencyAmount } from '../lib/currency';

export const ClusterDetailModal = ({
  isOpen,
  onClose,
  cluster,
  evidenceQuotes = [],
  currentStatus = 'Open',
  onUpdateStatus,
  onOpenDevTicket,
  onFilterClusterRows,
  totalCount,
  currency = 'USD',
}) => {
  if (!isOpen || !cluster) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#ECECEC] border border-[#C4BEB2] shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#EAE4D7] gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center flex-wrap gap-2">
              <Badge variant="slate" size="sm">
                Topic #{cluster.id}
              </Badge>
              <span className="text-xs text-[#625D54] font-medium">
                {cluster.category}
              </span>
              <Badge
                variant={cluster.urgency === 'high' ? 'danger' : cluster.urgency === 'medium' ? 'warning' : 'neutral'}
                size="sm"
              >
                {cluster.urgency === 'high' ? 'Critical Attention' : cluster.urgency === 'medium' ? 'Medium Priority' : 'Low Priority'}
              </Badge>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#35332F]">
              {cluster.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B655B] hover:text-[#35332F] hover:bg-[#FAF7F2] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Selector Bar */}
        <div className="mb-5 p-3 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-[#625D54] flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#71849A]" />
            Workflow Status:
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['Open', 'In Triage', 'In Progress', 'Resolved'].map((st) => {
              const isActive = currentStatus === st;
              const displayLabel = st === 'Open' ? 'Backlog' : st === 'In Triage' ? 'Under Review' : st;
              return (
                <button
                  key={st}
                  onClick={() => onUpdateStatus && onUpdateStatus(cluster.id, st)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#71849A] text-[#F4EFE6] font-semibold shadow-xs'
                      : 'bg-[#ECECEC] text-[#625D54] hover:text-[#35332F] hover:bg-[#EAE4D7] border border-[#C4BEB2]'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Experience & Recommended Action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] space-y-1.5">
              <span className="text-xs text-[#996515] font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#996515]" />
                What Customers Are Experiencing
              </span>
              <p className="text-[#45433D] leading-relaxed text-xs">
                {cluster.rootCause || 'Repeated customer complaints indicate friction in service workflows.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] space-y-1.5">
              <span className="text-xs text-[#2E7D32] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                Recommended Action Plan
              </span>
              <p className="text-[#45433D] leading-relaxed text-xs">
                {cluster.recommendation || 'Deploy targeted improvements to address root causes in the next release.'}
              </p>
            </div>
          </div>

          {/* Business Impact KPIs */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[11px] text-[#6B655B] font-medium tracking-wide">REVENUE IMPACT</div>
              <div className="text-sm sm:text-base font-bold text-[#2E7D32] mt-0.5">
                +{formatCurrencyAmount(cluster.revenueImpact || 38000, currency)}
              </div>
            </div>
            <div className="border-x border-[#C4BEB2]">
              <div className="text-[11px] text-[#6B655B] font-medium tracking-wide">EST. CHURN RISK</div>
              <div className="text-sm sm:text-base font-bold text-[#C62828] mt-0.5">
                {cluster.churnRisk || '14%'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#6B655B] font-medium tracking-wide">EFFORT</div>
              <div className="text-sm sm:text-base font-bold text-[#425B72] mt-0.5">
                {cluster.sprints || 1.5} Sprints
              </div>
            </div>
          </div>

          {/* Real Customer Evidence Quotes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#35332F] font-semibold flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-[#71849A]" />
                Recent Customer Quotes:
              </span>
              <span className="text-[11px] text-[#425B72] font-semibold">
                Verified from {totalCount ? `${totalCount.toLocaleString()} Dataset` : 'Verified Dataset'}
              </span>
            </div>

            <div className="space-y-2">
              {evidenceQuotes.length > 0 ? (
                evidenceQuotes.slice(0, 3).map((quote, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-xs text-[#45433D] leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="text-[#71849A] font-bold shrink-0">#{idx + 1}</span>
                    <span>&ldquo;{quote}&rdquo;</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-xs text-[#6B655B]">
                  Loading verified quotes from dataset...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 mt-5 border-t border-[#EAE4D7]">
          <button
            onClick={() => {
              if (onFilterClusterRows) onFilterClusterRows(cluster.id, cluster.category);
              onClose();
            }}
            className="text-xs text-[#425B72] hover:text-[#35332F] hover:underline flex items-center gap-1 cursor-pointer font-semibold self-start sm:self-auto"
          >
            <span>View All Reviews for [{cluster.id}]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconLeft={Share2}
              onClick={() => {
                onClose();
                if (onOpenDevTicket) onOpenDevTicket(cluster);
              }}
            >
              Dispatch &amp; Share Fix
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterDetailModal;
