import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Cpu } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import { CATEGORIES, CLUSTERS } from '../lib/datasetLoader';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://evidalis.onrender.com' : 'http://localhost:5000');

export const ManualFeedbackModal = ({ isOpen, onClose, onSubmitFeedback }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    category: 'Product Feedback',
    clusterId: 'PF-101',
    urgency: 'high',
    sentiment: 'negative',
    reviewText: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  if (!isOpen) return null;

  const currentClusters = CLUSTERS[formData.category] || [];

  const handleCategoryChange = (cat) => {
    const available = CLUSTERS[cat] || [];
    setFormData({
      ...formData,
      category: cat,
      clusterId: available[0]?.id || 'PF-101',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reviewText.trim()) return;

    setIsSubmitting(true);
    const clusterObj = currentClusters.find((c) => c.id === formData.clusterId) || currentClusters[0];

    const fallbackEntry = {
      _id: Date.now(),
      customer_id: formData.customerId.trim() || `usr_${Math.floor(Math.random() * 8999) + 1000}`,
      category: formData.category,
      cluster_id: formData.clusterId,
      cluster: clusterObj?.name || 'Manual Submission Cluster',
      review: formData.reviewText.trim(),
      feedback_text: formData.reviewText.trim(),
      urgency: formData.urgency,
      sentiment: formData.sentiment,
      created_at: new Date().toISOString(),
      is_manual_submission: true,
    };

    try {
      const res = await fetch(`${API_BASE}/api/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: formData.customerId,
          category: formData.category,
          reviewText: formData.reviewText,
          urgency: formData.urgency,
        }),
      });

      if (res.ok) {
        const payload = await res.json();
        if (payload.data?.record) {
          onSubmitFeedback(payload.data.record);
          setAiAnalysisResult(payload.data.analysis);
        } else {
          onSubmitFeedback(fallbackEntry);
        }
      } else {
        onSubmitFeedback(fallbackEntry);
      }
    } catch {
      // Backend offline fallback
      onSubmitFeedback(fallbackEntry);
    } finally {
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        setSubmittedSuccess(false);
        setAiAnalysisResult(null);
        onClose();
        setFormData({
          customerId: '',
          category: 'Product Feedback',
          clusterId: 'PF-101',
          urgency: 'high',
          sentiment: 'negative',
          reviewText: '',
        });
      }, 1400);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-[#ECECEC] border border-[#C4BEB2] shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE4D7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#35332F]">
                Submit Customer Feedback
              </h3>
              <p className="text-xs text-[#625D54]">
                Processed via Adaption AI Engine into live dataset pool
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#6B655B] hover:text-[#35332F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto animate-bounce" />
            <h4 className="text-base font-semibold text-[#35332F]">Feedback Analyzed &amp; Logged!</h4>
            <p className="text-xs text-[#625D54]">
              Review classified by Adaption AI with verifiable lineage.
            </p>

            {aiAnalysisResult && (
              <div className="mt-3 p-3 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-left text-xs space-y-1">
                <div className="flex items-center justify-between text-[#425B72] font-semibold">
                  <span>Cluster: [{aiAnalysisResult.detectedCluster?.id}]</span>
                  <span>Priority Score: {aiAnalysisResult.adaptivePriority?.score}</span>
                </div>
                <div className="text-[#625D54] text-[11px]">
                  Sentiment: <strong className="capitalize text-[#35332F]">{aiAnalysisResult.sentiment}</strong> (Confidence: {(aiAnalysisResult.confidenceScore * 100).toFixed(0)}%)
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer ID & Urgency Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#45433D] mb-1">
                  Customer ID (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. usr_4821"
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full bg-[#ECECEC] border border-[#C4BEB2] rounded-lg px-3 py-2 text-xs text-[#45433D] placeholder-[#716A60] focus-visible:outline-none focus-visible:border-[#71849A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#45433D] mb-1">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full bg-[#ECECEC] border border-[#C4BEB2] rounded-lg px-3 py-2 text-xs text-[#45433D] focus-visible:outline-none focus-visible:border-[#71849A]"
                >
                  <option value="high">High (Critical)</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-medium text-[#45433D] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-[#ECECEC] border border-[#C4BEB2] rounded-lg px-3 py-2 text-xs text-[#45433D] focus-visible:outline-none focus-visible:border-[#71849A]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sub-cluster Selection */}
            <div>
              <label className="block text-xs font-medium text-[#45433D] mb-1">
                Detected Cluster Pattern
              </label>
              <select
                value={formData.clusterId}
                onChange={(e) => setFormData({ ...formData, clusterId: e.target.value })}
                className="w-full bg-[#ECECEC] border border-[#C4BEB2] rounded-lg px-3 py-2 text-xs text-[#45433D] focus-visible:outline-none focus-visible:border-[#71849A]"
              >
                {currentClusters.map((cl) => (
                  <option key={cl.id} value={cl.id}>
                    [{cl.id}] {cl.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-medium text-[#45433D] mb-1">
                Review / Feedback Text *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Enter customer quote or support message details..."
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                className="w-full bg-[#ECECEC] border border-[#C4BEB2] rounded-lg p-3 text-xs text-[#45433D] placeholder-[#716A60] focus-visible:outline-none focus-visible:border-[#71849A] resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAE4D7]">
              <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" iconRight={Send} loading={isSubmitting}>
                Submit to Pool
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManualFeedbackModal;
