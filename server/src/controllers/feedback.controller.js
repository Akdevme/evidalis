import { z } from 'zod';
import { adaptionEngine } from '../services/adaptionService.js';
import { loadServerDataset, addFeedbackRow, getDatasetStats } from '../services/datasetService.js';

const submitSchema = z.object({
  customerId: z.string().optional(),
  reviewText: z.string().min(1, 'Review text is required'),
  category: z.string().optional(),
  urgency: z.string().optional(),
});

export const submitFeedback = async (req, res, next) => {
  try {
    const validated = submitSchema.parse(req.body);

    // Run review through Adaption AI
    const analysis = adaptionEngine.analyzeFeedback(validated.reviewText, validated.category);

    const newRecord = {
      customer_id: validated.customerId?.trim() || `usr_${Math.floor(Math.random() * 8999) + 1000}`,
      category: analysis.detectedCategory,
      cluster_id: analysis.detectedCluster.id,
      cluster: analysis.detectedCluster.name,
      review: validated.reviewText.trim(),
      feedback_text: validated.reviewText.trim(),
      urgency: validated.urgency || analysis.urgency,
      sentiment: analysis.sentiment,
      is_api_submission: true,
      created_at: new Date().toISOString(),
    };

    const saved = addFeedbackRow(newRecord);

    return res.status(201).json({
      success: true,
      message: 'Feedback processed by Adaption AI and logged to dataset pool',
      data: {
        record: saved,
        analysis,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: err.errors,
      });
    }
    next(err);
  }
};

export const getFeedbackList = async (req, res, next) => {
  try {
    const dataset = loadServerDataset();
    const limit = Math.min(200, parseInt(req.query.limit, 10) || 50);
    const category = req.query.category;
    const sentiment = req.query.sentiment;

    let filtered = dataset;
    if (category && category !== 'all') {
      filtered = filtered.filter((r) => r.category === category);
    }
    if (sentiment && sentiment !== 'all') {
      filtered = filtered.filter((r) => r.sentiment === sentiment);
    }

    return res.status(200).json({
      success: true,
      totalMatching: filtered.length,
      data: filtered.slice(0, limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = getDatasetStats();
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
