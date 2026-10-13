import { generateExecutiveBriefing } from '../services/aiService.js';
import { getDatasetStats } from '../services/datasetService.js';

export const getQwenExecutiveBriefing = async (req, res, next) => {
  try {
    const stats = getDatasetStats();
    const {
      category = 'All Categories',
      clusterId = null,
      topClusters = ['FS-301', 'PF-102', 'CS-201', 'OI-401'],
      reviewsCount,
    } = req.body || {};

    const briefing = await generateExecutiveBriefing({
      category,
      clusterId,
      topClusters,
      categoryStats: stats?.categoryCounts || {},
      totalReviews: reviewsCount || stats?.totalRecords || 7001,
    });

    return res.status(200).json({
      success: true,
      data: briefing,
    });
  } catch (err) {
    next(err);
  }
};

export const getGemmaExecutiveBriefing = getQwenExecutiveBriefing;

export default {
  getQwenExecutiveBriefing,
  getGemmaExecutiveBriefing,
};
