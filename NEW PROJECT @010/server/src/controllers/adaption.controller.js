import { z } from 'zod';
import { adaptionEngine } from '../services/adaptionService.js';
import { getDatasetStats } from '../services/datasetService.js';

const analyzeSchema = z.object({
  text: z.string().min(1, 'Review text is required'),
  category: z.string().optional(),
});

const recalibrateSchema = z.object({
  sensitivity: z.number().min(0.05).max(1.0),
});

export const analyzeFeedback = async (req, res, next) => {
  try {
    const validated = analyzeSchema.parse(req.body);
    const result = adaptionEngine.analyzeFeedback(validated.text, validated.category);
    return res.status(200).json({
      success: true,
      data: result,
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

export const getAdaptionState = async (req, res, next) => {
  try {
    const state = await adaptionEngine.getState();
    const stats = getDatasetStats();
    return res.status(200).json({
      success: true,
      data: {
        engine: state,
        dataset: stats,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const testConnection = async (req, res, next) => {
  try {
    const result = await adaptionEngine.verifyConnection();
    return res.status(200).json({
      success: result.success,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const recalibrateEngine = async (req, res, next) => {
  try {
    const validated = recalibrateSchema.parse(req.body);
    const updated = adaptionEngine.recalibrate(validated.sensitivity);
    return res.status(200).json({
      success: true,
      message: 'Adaption AI engine recalibrated successfully',
      data: updated,
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

export const triggerCloudJob = async (req, res, next) => {
  try {
    const result = await adaptionEngine.triggerCloudJob();
    return res.status(200).json({
      success: result.success,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getCloudDatasets = async (req, res, next) => {
  try {
    const datasets = await adaptionEngine.getCloudDatasets(req.query.refresh === 'true');
    return res.status(200).json({
      success: true,
      data: datasets,
    });
  } catch (err) {
    next(err);
  }
};
