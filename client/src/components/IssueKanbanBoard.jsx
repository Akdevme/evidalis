/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React from 'react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import {
  Layers,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GitPullRequest,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Activity,
  Inbox,
  Search,
} from 'lucide-react';
import { CATEGORIES, CLUSTERS } from '../lib/datasetLoader';

export const IssueKanbanBoard = ({
  issueStatuses = {},
  onUpdateStatus,
  onOpenClusterModal,
  onOpenDevTicket,
}) => {
  const columns = [
    { id: 'Open', label: 'Backlog', icon: Inbox, color: 'border-l-4 border-l-[#C4BEB2]', countColor: 'text-[#625D54]', iconColor: 'text-[#6B655B]' },
    { id: 'In Triage', label: 'Under Review', icon: Search, color: 'border-l-4 border-l-[#996515]', countColor: 'text-[#996515]', iconColor: 'text-[#996515]' },
    { id: 'In Progress', label: 'In Progress', icon: Clock, color: 'border-l-4 border-l-[#71849A]', countColor: 'text-[#71849A]', iconColor: 'text-[#71849A]' },
    { id: 'Resolved', label: 'Resolved', icon: CheckCircle2, color: 'border-l-4 border-l-[#2E7D32]', countColor: 'text-[#2E7D32]', iconColor: 'text-[#2E7D32]' },
  ];

  // Flatten all clusters from the 4 categories
  const allClusters = React.useMemo(() => {
    return CATEGORIES.flatMap((cat) => CLUSTERS[cat] || []);
  }, []);

  // Group clusters into status columns
  const grouped = React.useMemo(() => {
    const map = {
      'Open': [],
      'In Triage': [],
      'In Progress': [],
      'Resolved': [],
    };

    allClusters.forEach((cl) => {
      const st = issueStatuses[cl.id] || 'Open';
      if (map[st]) {
        map[st].push(cl);
      } else {
        map['Open'].push(cl);
      }
    });

    return map;
  }, [allClusters, issueStatuses]);

  const handleNextStatus = (clusterId, currentStatus) => {
    const order = ['Open', 'In Triage', 'In Progress', 'Resolved'];
    const currentIdx = order.indexOf(currentStatus);
    if (currentIdx < order.length - 1) {
      onUpdateStatus(clusterId, order[currentIdx + 1]);
    }
  };

  const handlePrevStatus = (clusterId, currentStatus) => {
    const order = ['Open', 'In Triage', 'In Progress', 'Resolved'];
    const currentIdx = order.indexOf(currentStatus);
    if (currentIdx > 0) {
      onUpdateStatus(clusterId, order[currentIdx - 1]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner explaining Issue Tracking */}
      <div className="p-4 rounded-xl bg-[#ECECEC] border border-[#C4BEB2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm text-[#35332F]">
              Customer Action Items &amp; Issue Pipeline
            </span>
            <p className="text-[#625D54] text-xs mt-0.5">
              Organize customer friction points from detection through resolution. Progress is saved automatically.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#6B655B] self-start sm:self-auto font-medium">
          <span>{allClusters.length} Issues Tracked</span>
          <span>&bull;</span>
          <span className="text-[#425B72] font-semibold">{grouped['In Progress'].length} In Progress</span>
          <span>&bull;</span>
          <span className="text-[#2E7D32] font-semibold">{grouped['Resolved'].length} Resolved</span>
        </div>
      </div>

      {/* 4 Responsive Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = grouped[col.id] || [];

          return (
            <div
              key={col.id}
              className="rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] flex flex-col max-h-[700px] shadow-xs"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-[#C4BEB2] flex items-center justify-between bg-[#F2EDE4] rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-md bg-[#ECECEC] border border-[#C4BEB2] ${col.iconColor} shadow-2xs`}>
                    <col.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#35332F]">
                    {col.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full bg-[#ECECEC] border border-[#C4BEB2] text-xs font-bold ${col.countColor}`}>
                    {items.length}
                  </span>
                </div>
              </div>

              {/* Column Content Scrollable */}
              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1 min-h-[140px]">
                {items.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#6B655B] border border-dashed border-[#C4BEB2] rounded-xl bg-[#ECECEC]">
                    No issues in this stage
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl bg-[#ECECEC] border border-[#C4BEB2] hover:border-[#71849A] transition-all flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs ${col.color}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2">
                          <button
                            onClick={() => onOpenClusterModal && onOpenClusterModal(item)}
                            className="text-xs font-semibold text-[#425B72] hover:text-[#35332F] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Topic #{item.id}</span>
                            <ExternalLink className="w-3 h-3 text-[#6B655B]" />
                          </button>

                          <Badge
                            variant={item.urgency === 'high' ? 'danger' : item.urgency === 'medium' ? 'warning' : 'neutral'}
                            size="sm"
                          >
                            {item.urgency === 'high' ? 'Critical' : item.urgency === 'medium' ? 'Medium' : 'Low'}
                          </Badge>
                        </div>

                        <h5
                          onClick={() => onOpenClusterModal && onOpenClusterModal(item)}
                          className="text-xs sm:text-[13px] font-semibold text-[#35332F] leading-snug cursor-pointer hover:text-[#425B72] transition-colors"
                        >
                          {item.name}
                        </h5>

                        <div className="text-xs text-[#625D54] mt-1.5 font-medium">
                          {item.category}
                        </div>
                      </div>

                      {/* Card Bottom Meta & 1-Tap Controls */}
                      <div className="pt-2.5 border-t border-[#EAE4D7] flex items-center justify-between text-xs">
                        <span className="text-xs text-[#2E7D32] font-semibold">
                          +${(item.revenueImpact || 30000).toLocaleString()} saved
                        </span>

                        <div className="flex items-center gap-1.5">
                          {col.id !== 'Open' && (
                            <button
                              onClick={() => handlePrevStatus(item.id, col.id)}
                              title="Move back"
                              className="px-2 py-1 rounded bg-[#FAF7F2] hover:bg-[#EAE4D7] text-[#625D54] hover:text-[#35332F] border border-[#C4BEB2] cursor-pointer text-[11px] font-medium flex items-center gap-1"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span className="hidden sm:inline">Back</span>
                            </button>
                          )}

                          {col.id !== 'Resolved' && (
                            <button
                              onClick={() => handleNextStatus(item.id, col.id)}
                              title="Move to next stage"
                              className="px-2 py-1 rounded bg-[#71849A] hover:bg-[#5E7086] text-[#F4EFE6] cursor-pointer flex items-center gap-1 text-[11px] font-semibold shadow-xs"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IssueKanbanBoard;
