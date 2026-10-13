/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React, { useState } from 'react';
import Card from './Card';
import Badge from './Badge';
import { Sliders, TrendingUp, DollarSign, HeartPulse, CheckSquare, Square, Coins } from 'lucide-react';
import { CURRENCY_CONFIG, formatCurrencyAmount } from '../lib/currency';

export const RoiDecisionSimulator = ({ totalCount, currency = 'USD', onCurrencyChange }) => {
  const [selectedResolutions, setSelectedResolutions] = useState({
    'PF-101': true,
    'FS-301': true,
    'CS-201': false,
    'OI-401': false,
  });

  const availableIssues = [
    {
      id: 'PF-101',
      title: 'Fix WebKit Payment Gateway Timeout',
      category: 'Product Feedback',
      churnImpact: 14,
      revenueProtected: 38000,
      sentimentLift: 12,
      sprints: 1.5,
    },
    {
      id: 'FS-301',
      title: 'Block Demands for Additional Payments',
      category: 'Fraud and Scam',
      churnImpact: 18,
      revenueProtected: 54000,
      sentimentLift: 16,
      sprints: 2,
    },
    {
      id: 'CS-201',
      title: 'Automate Support Queue SLA Escalations',
      category: 'Customer Service',
      churnImpact: 9,
      revenueProtected: 21000,
      sentimentLift: 8,
      sprints: 1,
    },
    {
      id: 'OI-401',
      title: 'Deploy Real-Time Delivery Tracking Push',
      category: 'Operational Issues',
      churnImpact: 11,
      revenueProtected: 29000,
      sentimentLift: 9,
      sprints: 1.5,
    },
  ];

  const toggleIssue = (id) => {
    setSelectedResolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate simulated totals
  const totals = React.useMemo(() => {
    let churn = 0;
    let rev = 0;
    let lift = 0;
    let sprints = 0;

    availableIssues.forEach((issue) => {
      if (selectedResolutions[issue.id]) {
        churn += issue.churnImpact;
        rev += issue.revenueProtected;
        lift += issue.sentimentLift;
        sprints += issue.sprints;
      }
    });

    return {
      churn: Math.min(48, churn),
      revenue: rev,
      lift,
      sprints: Math.round(sprints * 10) / 10,
    };
  }, [selectedResolutions]);

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#C4BEB2]/50 gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#71849A]" />
          <div>
            <h3 className="text-base font-semibold text-[#35332F]">
              Executive ROI &amp; Financial Impact Simulator
            </h3>
            <p className="text-xs text-[#625D54]">
              Model product roadmap revenue protection &amp; churn reduction
            </p>
          </div>
        </div>

        {/* Currency Toggler: USD ($), INR (₹), EUR (€), GBP (£) */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-[#ECECEC] p-1 rounded-xl border border-[#C4BEB2] shadow-xs">
            {Object.keys(CURRENCY_CONFIG).map((code) => {
              const isAct = currency === code;
              return (
                <button
                  key={code}
                  onClick={() => onCurrencyChange && onCurrencyChange(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isAct
                      ? 'bg-[#71849A] text-[#F4EFE6] shadow-xs'
                      : 'text-[#625D54] hover:text-[#35332F] hover:bg-[#FAF7F2]'
                  }`}
                  title={`Switch currency to ${CURRENCY_CONFIG[code].label}`}
                >
                  {CURRENCY_CONFIG[code].label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Resolution Checkbox Toggles (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          <span className="text-xs font-sans text-[#6B655B] block mb-1">
            Toggle Roadmap Interventions:
          </span>

          {availableIssues.map((issue) => {
            const isChecked = selectedResolutions[issue.id];
            return (
              <div
                key={issue.id}
                onClick={() => toggleIssue(issue.id)}
                className={`p-3 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-[#FAF7F2] border-[#71849A] shadow-xs'
                    : 'bg-[#ECECEC] border-[#C4BEB2] hover:border-[#71849A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#71849A]">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#71849A]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#C4BEB2]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#35332F]">{issue.title}</div>
                    <div className="text-[11px] font-sans text-[#6B655B]">
                      [{issue.id}] {issue.category} &bull; Est. {issue.sprints} sprints
                    </div>
                  </div>
                </div>

                <div className="font-sans text-xs text-[#2E7D32] shrink-0 font-semibold">
                  +{formatCurrencyAmount(issue.revenueProtected, currency)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Projected Business Outcome KPI Cards (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#C4BEB2] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs">
          <div className="text-xs font-sans font-semibold text-[#425B72] uppercase tracking-wider">
            PROJECTED BUSINESS IMPACT ({currency})
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#C4BEB2]/50 pb-2">
              <span className="text-xs text-[#625D54] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#2E7D32]" />
                Churn Reduction
              </span>
              <span className="font-sans text-base font-bold text-[#2E7D32]">
                -{totals.churn}%
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#C4BEB2]/50 pb-2">
              <span className="text-xs text-[#625D54] flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-[#71849A]" />
                Revenue Protected
              </span>
              <span className="font-sans text-base font-bold text-[#35332F]">
                +{formatCurrencyAmount(totals.revenue, currency)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#C4BEB2]/50 pb-2">
              <span className="text-xs text-[#625D54] flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-[#2E7D32]" />
                Customer Sentiment Lift
              </span>
              <span className="font-sans text-base font-bold text-[#2E7D32]">
                +{totals.lift} pts
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#625D54]">
                Required Engineering Load
              </span>
              <span className="font-sans text-sm font-semibold text-[#35332F]">
                {totals.sprints} Sprints
              </span>
            </div>
          </div>

          <div className="text-[11px] font-sans text-[#6B655B] leading-normal border-t border-[#C4BEB2]/50 pt-2">
            Decision logic calibrated against {totalCount ? `${totalCount.toLocaleString()} historical reviews` : 'historical feedback dataset'}.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoiDecisionSimulator;
