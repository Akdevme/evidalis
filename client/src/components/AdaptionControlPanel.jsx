/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { 
  Cpu, Zap, RefreshCw, Sliders, CheckCircle2, ShieldCheck, 
  Database, Sparkles, Activity, Terminal, ArrowRight, ShieldAlert,
  Layers
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://evidalis.onrender.com' : 'http://localhost:5000');

export const AdaptionControlPanel = ({ onTriggerRecluster, totalReviews, datasetName }) => {
  const [sensitivity, setSensitivity] = useState(0.75);
  const [velocityThreshold, setVelocityThreshold] = useState(3);
  const [isAdapting, setIsAdapting] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [engineMode, setEngineMode] = useState('live');
  const [latencyMs, setLatencyMs] = useState(140);
  const [maskedKey, setMaskedKey] = useState('pt_live_••••••');
  
  // Synced Cloud Datasets
  const [cloudDatasets, setCloudDatasets] = useState([]);

  // Interactive Triage State
  const [triageText, setTriageText] = useState(
    'Seller demanded an extra $85 wire transfer outside the platform to release the shipment.'
  );
  const [triageResult, setTriageResult] = useState(null);
  const [isTriaging, setIsTriaging] = useState(false);

  const [datasetEval, setDatasetEval] = useState({
    qualityScore: 94.8,
    noiseReduction: '88.5%',
    totalRowsAudited: totalReviews || 7001,
    provider: 'Adaption Labs (Adaptive Data Engine)',
    clarityIndex: 0.96,
  });

  const [adaptationLogs, setAdaptationLogs] = useState([
    {
      time: '12:14:20',
      action: 'Velocity Adaptation: Lowered FS-301 threshold from 5 to 3 due to phishing arrival surge.',
      category: 'Fraud and Scam',
    },
    {
      time: '12:08:45',
      action: 'Severity Shift: Boosted Negative Severity factor by +14% across checkout payment reviews.',
      category: 'Product Feedback',
    },
    {
      time: '11:55:10',
      action: 'Threshold Reset: Customer Service response SLA queue normalized.',
      category: 'Customer Service',
    },
  ]);

  const debounceTimerRef = useRef(null);

  // Fetch initial engine state from backend
  const fetchEngineState = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/adaption/state`);
      const payload = await res.json();
      if (payload.success && payload.data?.engine) {
        setIsBackendConnected(true);
        const eng = payload.data.engine;
        setSensitivity(eng.sensitivity);
        setVelocityThreshold(eng.velocityThreshold);
        if (eng.engineMode) setEngineMode(eng.engineMode);
        if (eng.maskedKey) setMaskedKey(eng.maskedKey);
        if (eng.connection?.latencyMs) setLatencyMs(eng.connection.latencyMs);
        if (eng.cloudDatasets) setCloudDatasets(eng.cloudDatasets);
        if (eng.datasetEvaluation) {
          setDatasetEval({
            ...eng.datasetEvaluation,
            totalRowsAudited: totalReviews || eng.datasetEvaluation.totalRowsAudited || 7001,
          });
        }
        if (eng.auditLogs && eng.auditLogs.length > 0) {
          setAdaptationLogs(
            eng.auditLogs.slice(0, 5).map((log) => ({
              time: new Date(log.timestamp).toLocaleTimeString([], { hour12: false }),
              action: log.action,
              category: log.category || 'Adaption AI',
            }))
          );
        }
      }
    } catch {
      setIsBackendConnected(false);
    }
  };

  useEffect(() => {
    fetchEngineState();
  }, []);

  // Update total rows audited whenever dataset prop changes
  useEffect(() => {
    if (totalReviews) {
      setDatasetEval((prev) => ({
        ...prev,
        totalRowsAudited: totalReviews,
      }));
    }
  }, [totalReviews]);

  // Debounced slider handler
  const handleSliderChange = (val) => {
    const floatVal = parseFloat(val);
    setSensitivity(floatVal);
    const newThreshold = Math.max(2, Math.round(6 - floatVal * 4));
    setVelocityThreshold(newThreshold);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      executeRecalibrate(floatVal);
    }, 450);
  };

  const executeRecalibrate = async (targetSensitivity) => {
    setIsAdapting(true);
    try {
      const res = await fetch(`${API_BASE}/api/adaption/recalibrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sensitivity: targetSensitivity }),
      });

      if (res.ok) {
        const payload = await res.json();
        setIsBackendConnected(true);
        const data = payload.data;
        if (data) {
          setVelocityThreshold(data.velocityThreshold);
          if (data.auditLog) {
            const newLog = {
              time: new Date(data.auditLog.timestamp).toLocaleTimeString([], { hour12: false }),
              action: data.auditLog.action,
              category: data.auditLog.category,
            };
            setAdaptationLogs((prev) => [newLog, ...prev.filter((l) => l.action !== newLog.action).slice(0, 4)]);
          }
        }
      }
    } catch {
      // Local clean fallback (no AM/PM)
      const now = new Date().toLocaleTimeString([], { hour12: false });
      const newLog = {
        time: now,
        action: `Dynamic Adaptation: Sensitivity set to alpha=${targetSensitivity.toFixed(2)}. Alert threshold adapted to ${velocityThreshold} complaints.`,
        category: 'Adaption Controller',
      };
      setAdaptationLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    } finally {
      setIsAdapting(false);
      if (onTriggerRecluster) onTriggerRecluster(targetSensitivity);
    }
  };

  // Run real-time feedback triage
  const handleRunTriage = async () => {
    if (!triageText.trim()) return;
    setIsTriaging(true);
    try {
      const res = await fetch(`${API_BASE}/api/adaption/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: triageText.trim() }),
      });
      if (res.ok) {
        const payload = await res.json();
        if (payload.success && payload.data) {
          setTriageResult(payload.data);
        }
      }
    } catch (err) {
      console.warn('Triage error:', err.message);
    } finally {
      setIsTriaging(false);
    }
  };

  return (
    <Card className="p-5 sm:p-7 space-y-6">
      {/* Top Header & Telemetry Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE4D7] gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#35332F]">
              AI Sensitivity &amp; Adaption Labs Adaptive Engine
            </h3>
            <p className="text-xs text-[#625D54]">
              Continuous feedback anomaly detection, dynamic velocity threshold calibration, and real-time noise reduction
            </p>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2 flex-wrap">
          {isBackendConnected && (
            <Badge variant="emerald" size="sm" dot>
              Backend Live
            </Badge>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
            <span>Adaption Labs Cloud Active</span>
            {latencyMs && <span className="text-[10px] text-[#2E7D32]/80">({latencyMs}ms)</span>}
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF7F2] text-[#625D54] border border-[#C4BEB2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Adaptive Data Engine</span>
          </span>
        </div>
      </div>

      {/* Adaption Labs: Adaptive Data Hygiene & Telemetry Strip */}
      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#EAE4D7] gap-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#425B72]" />
            <span className="text-xs font-bold text-[#35332F] uppercase tracking-wider">
              Adaption Labs &bull; Adaptive Data Telemetry
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#625D54]">Engine:</span>
            <span className="text-[11px] font-semibold text-[#425B72]">
              {datasetEval?.provider || 'Adaption Labs (Adaptive Data Engine)'}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
              Live Engine Verified
            </span>
            {cloudDatasets.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECECEC] text-[#425B72] border border-[#C4BEB2]">
                {cloudDatasets.length} Cloud Models Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-2.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2]">
            <div className="text-[10px] uppercase font-semibold text-[#625D54]">Data Quality Score</div>
            <div className="text-base font-bold text-[#2E7D32] flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>{datasetEval?.qualityScore || 94.8}%</span>
            </div>
            <div className="text-[10px] text-[#6B655B] mt-0.5">Verified clean schema</div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2]">
            <div className="text-[10px] uppercase font-semibold text-[#625D54]">Noise Reduction</div>
            <div className="text-base font-bold text-[#425B72] flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#425B72]" />
              <span>{datasetEval?.noiseReduction || '88.5%'}</span>
            </div>
            <div className="text-[10px] text-[#6B655B] mt-0.5">Filtered low-signal noise</div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2]">
            <div className="text-[10px] uppercase font-semibold text-[#625D54]">Audited Reviews</div>
            <div className="text-base font-bold text-[#35332F] flex items-center gap-1 mt-0.5">
              <Database className="w-3.5 h-3.5 text-[#71849A]" />
              <span>{(totalReviews || datasetEval?.totalRowsAudited || 7001).toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-[#6B655B] mt-0.5 truncate max-w-[150px]">
              {datasetName || 'Active CSV dataset pool'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2]">
            <div className="text-[10px] uppercase font-semibold text-[#625D54]">Semantic Clarity</div>
            <div className="text-base font-bold text-[#35332F] flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#71849A]" />
              <span>{datasetEval?.clarityIndex || 0.96}</span>
            </div>
            <div className="text-[10px] text-[#6B655B] mt-0.5">AutoScientist index</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dynamic Sensitivity & Velocity Controller (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#425B72]" />
                <span className="text-xs font-bold text-[#35332F] uppercase tracking-wider">
                  Anomaly Sensitivity Controller (&alpha;)
                </span>
              </div>
              <span className="text-[#425B72] font-bold text-sm">
                {(sensitivity * 100).toFixed(0)}% ({sensitivity >= 0.7 ? 'High Alert' : sensitivity >= 0.4 ? 'Balanced' : 'Conservative'})
              </span>
            </div>

            <div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={sensitivity}
                onChange={(e) => handleSliderChange(e.target.value)}
                className="w-full h-2.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer accent-[#71849A] border border-[#C4BEB2]"
              />

              <div className="flex items-center justify-between text-[11px] text-[#6B655B] mt-1.5 font-medium">
                <span>Conservative (&alpha;=0.10)</span>
                <span>Balanced (&alpha;=0.50)</span>
                <span>High Alert (&alpha;=1.00)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#625D54] font-medium">Spike Velocity Threshold:</span>
                <span className="text-[#425B72] font-semibold">{velocityThreshold} similar reviews trigger alert</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#625D54] font-medium">Negative Severity Factor (&beta;):</span>
                <span className="text-[#2E7D32] font-semibold">{(0.35 + sensitivity * 0.25).toFixed(2)}x weight</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#625D54] font-medium">Adaptive Noise Guard:</span>
                <span className="text-[#35332F] font-semibold">{sensitivity > 0.6 ? 'High Sensitivity Guard' : 'Standard Filter'}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="primary"
                size="sm"
                iconLeft={RefreshCw}
                onClick={() => executeRecalibrate(sensitivity)}
                loading={isAdapting}
                className="w-full text-xs justify-center py-2.5"
              >
                Apply Recalibration
              </Button>
              <p className="text-[11px] text-center text-[#6B655B] font-medium">
                Auto adapts on slider change
              </p>
            </div>
          </div>

          {/* Recent Adaptation Logs */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#35332F] font-semibold">
              <span>Recent Adaptation Activity</span>
              <span className="text-[11px] text-[#2E7D32] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                Live Feed
              </span>
            </div>

            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {adaptationLogs.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#ECECEC] border border-[#C4BEB2] text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#6B655B] mb-0.5 font-medium">
                    <span>{log.time}</span>
                    <span className="text-[#425B72] font-semibold">{log.category}</span>
                  </div>
                  <div className="text-[#45433D] text-[11px] leading-relaxed">{log.action}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EAE4D7] text-xs text-[#625D54]">
              <strong className="text-[#35332F] font-semibold">Formula:</strong> Priority = (Frequency &times; &alpha;) + (NegativeSeverity &times; &beta;) + (Confidence &times; &gamma;)
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Adaptive Triage (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#425B72]" />
                <span className="text-xs font-bold text-[#35332F] uppercase tracking-wider">
                  Test Adaptive Feedback Triage
                </span>
              </div>
              <Badge variant="blue" size="sm">
                Live NLP
              </Badge>
            </div>
            <p className="text-xs text-[#625D54]">
              Run any customer feedback quote through the Adaption Engine to test real-time cluster classification, polarity scoring, and urgency routing.
            </p>

            {/* Quick Test Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-[#6B655B]">Quick test:</span>
              <button
                type="button"
                onClick={() => setTriageText('Seller messaged me privately demanding additional $80 wire transfer or my order will be canceled.')}
                className="px-2 py-0.5 rounded text-[10px] bg-[#ECECEC] hover:bg-[#EAE4D7] text-[#35332F] border border-[#C4BEB2] cursor-pointer transition-colors"
              >
                Extortion Scam
              </button>
              <button
                type="button"
                onClick={() => setTriageText('Safari checkout keeps crashing on the payment confirmation screen with spinning loader.')}
                className="px-2 py-0.5 rounded text-[10px] bg-[#ECECEC] hover:bg-[#EAE4D7] text-[#35332F] border border-[#C4BEB2] cursor-pointer transition-colors"
              >
                Checkout Crash
              </button>
              <button
                type="button"
                onClick={() => setTriageText('Support ticket #4029 waiting over 5 days with zero response from billing team.')}
                className="px-2 py-0.5 rounded text-[10px] bg-[#ECECEC] hover:bg-[#EAE4D7] text-[#35332F] border border-[#C4BEB2] cursor-pointer transition-colors"
              >
                Support Delay
              </button>
            </div>

            <textarea
              rows={3}
              value={triageText}
              onChange={(e) => setTriageText(e.target.value)}
              placeholder="Paste or enter customer review text..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-xs text-[#35332F] focus:outline-hidden focus:border-[#425B72]"
            />

            <Button
              variant="primary"
              size="sm"
              iconLeft={Sparkles}
              onClick={handleRunTriage}
              loading={isTriaging}
              className="w-full sm:w-auto text-xs"
            >
              Analyze with Adaption AI
            </Button>

            {/* Triage Output Card */}
            {triageResult && (
              <div className="mt-3 p-3.5 rounded-xl bg-[#ECECEC] border border-[#C4BEB2] space-y-2.5 animate-tab-enter text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#C4BEB2]">
                  <span className="font-bold text-[#35332F]">Adaption Diagnosis Result</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    triageResult.urgency === 'high' 
                      ? 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]' 
                      : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                  }`}>
                    {triageResult.urgency} Urgency
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                    <div className="text-[10px] text-[#6B655B]">Category</div>
                    <div className="font-semibold text-[#35332F]">{triageResult.detectedCategory}</div>
                  </div>
                  <div className="p-2 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                    <div className="text-[10px] text-[#6B655B]">Polarity Score</div>
                    <div className="font-semibold text-[#35332F] capitalize">
                      {triageResult.sentiment} ({triageResult.polarityScore})
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                  <div className="text-[10px] text-[#6B655B] font-semibold">Matched Semantic Cluster</div>
                  <div className="font-bold text-[#425B72]">{triageResult.detectedCluster?.id}: {triageResult.detectedCluster?.name}</div>
                  <div className="text-[11px] text-[#625D54] mt-0.5">{triageResult.detectedCluster?.rootCause}</div>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                  <span className="text-[11px] text-[#625D54]">Adaptive Priority Score:</span>
                  <span className="text-sm font-bold text-[#425B72]">{triageResult.adaptivePriority?.score} / 40</span>
                </div>

                {triageResult.recommendation && (
                  <div className="pt-1 text-[11px] text-[#625D54]">
                    <strong className="text-[#35332F]">Action Plan:</strong> {triageResult.recommendation.action} ({triageResult.recommendation.estSprints} sprint effort)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdaptionControlPanel;
