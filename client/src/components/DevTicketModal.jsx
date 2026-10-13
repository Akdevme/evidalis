import React, { useState } from 'react';
import { 
  X, Copy, Check, GitPullRequest, Send, MessageSquare, Mail, 
  ExternalLink, Share2, Sparkles, Smartphone
} from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

export const DevTicketModal = ({ isOpen, onClose, cluster }) => {
  const [activeTab, setActiveTab] = useState('team'); // 'team' | 'dev'
  const [copiedType, setCopiedType] = useState(null); // 'team' | 'dev' | 'discord'

  if (!isOpen || !cluster) return null;

  // Clean, summary for WhatsApp, Discord, Instagram, Slack
  const chatMessage = `🚨 CUSTOMER FRICTION ALERT [${cluster.id}]: ${cluster.name}
━━━━━━━━━━━━━━━━━━━━
• Urgency: ${cluster.urgency?.toUpperCase() || 'HIGH'}
• Churn Risk: ${cluster.churnRisk || '14%'}
• Revenue Impact: +$${(cluster.revenueImpact || 38000).toLocaleString()}

🔍 What Happened:
${cluster.rootCause || 'Recurring customer complaints detected in feedback stream.'}

🛠️ How to Fix:
${cluster.recommendation || 'Deploy mitigation workflow and update system rules.'}

💬 Verified Customer Quote:
"${cluster.sampleQuote1 || cluster.sampleQuote2 || 'Customer reported repeated friction and severe delay.'}"
━━━━━━━━━━━━━━━━━━━━
Sent from Evidalis Intelligence Hub`;

  // Technical spec for GitHub / Jira developers
  const ticketMarkdown = `### [ISSUE] ${cluster.id}: ${cluster.name}
**Category:** ${cluster.category || 'Customer Analytics'}
**Urgency:** ${cluster.urgency?.toUpperCase() || 'HIGH'}
**Revenue at Risk:** $${(cluster.revenueImpact || 38000).toLocaleString()} | **Effort:** ${cluster.sprints || 1.5} Sprints

#### Problem Description
${cluster.rootCause || 'Recurring friction identified through adaptive cluster analysis.'}

#### Customer Evidence
- "${cluster.sampleQuote1 || 'Customer reported critical friction.'}"
- "${cluster.sampleQuote2 || 'Service failed during core workflow.'}"

#### Suggested Technical Resolution
- ${cluster.recommendation || 'Implement resilient retry fallback and exception handler.'}
- Add telemetry logging on client session callbacks.
- Sprint priority: Immediate release cycle.
`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(chatMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`[URGENT FIX] ${cluster.id}: ${cluster.name}`);
    const body = encodeURIComponent(chatMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-[#ECECEC] border border-[#C4BEB2] shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE4D7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#35332F]">
                Dispatch Action Item &amp; Share
              </h3>
              <p className="text-xs text-[#625D54]">
                Send this fix to your team, engineer, or founder on any platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B655B] hover:text-[#35332F] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Issue Identification Pill */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant="slate" size="sm">{cluster.id}</Badge>
          <span className="text-xs text-[#35332F] font-bold">{cluster.name}</span>
          <Badge variant={cluster.urgency === 'high' ? 'danger' : 'warning'} size="sm">
            {cluster.urgency?.toUpperCase() || 'HIGH'}
          </Badge>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] mb-4 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'team'
                ? 'bg-[#ECECEC] text-[#35332F] shadow-xs border border-[#C4BEB2]'
                : 'text-[#625D54] hover:text-[#35332F]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Team &amp; Chat Share (WhatsApp / Slack)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dev')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'dev'
                ? 'bg-[#ECECEC] text-[#35332F] shadow-xs border border-[#C4BEB2]'
                : 'text-[#625D54] hover:text-[#35332F]'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5 text-[#71849A]" />
            <span>Developer Spec (GitHub / Jira)</span>
          </button>
        </div>

        {/* Tab 1: Quick Team Share Content */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#625D54]">
                <span>PREVIEW FOR CHAT / MESSAGES</span>
          
              </div>
              <pre className="font-sans whitespace-pre-wrap text-[#35332F] text-xs leading-relaxed max-h-[220px] overflow-y-auto pr-1">
                {chatMessage}
              </pre>
            </div>

            {/* 1-Click Platform Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="p-2.5 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] hover:bg-[#C8E6C9] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="text-[11px] font-bold">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(chatMessage, 'discord')}
                className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#425B72] hover:bg-[#EAE4D7] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[11px] font-bold">
                  {copiedType === 'discord' ? 'Copied!' : 'Slack / Discord'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleEmailShare}
                className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#35332F] hover:bg-[#EAE4D7] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span className="text-[11px] font-bold">Email Alert</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(chatMessage, 'team')}
                className="p-2.5 rounded-xl bg-[#71849A] text-[#F4EFE6] hover:bg-[#5C6F85] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                {copiedType === 'team' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-[11px] font-bold">
                  {copiedType === 'team' ? 'Copied!' : 'Copy Text'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Dev Spec Content */}
        {activeTab === 'dev' && (
          <div className="space-y-4">
            <pre className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-xs font-mono text-[#45433D] whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[260px]">
              {ticketMarkdown}
            </pre>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#6B655B]">
                Pre-formatted for Jira, Linear, or GitHub Issues
              </span>
              <Button
                variant="primary"
                size="sm"
                iconLeft={copiedType === 'dev' ? Check : Copy}
                onClick={() => copyToClipboard(ticketMarkdown, 'dev')}
              >
                {copiedType === 'dev' ? 'Copied Markdown!' : 'Copy for GitHub/Jira'}
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 mt-5 border-t border-[#EAE4D7]">
          <span className="text-[11px] text-[#6B655B]">
            Bridge customer feedback directly to resolution
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DevTicketModal;

