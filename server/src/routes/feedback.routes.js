import { Router } from 'express';
import {
  submitFeedback,
  getFeedbackList,
  getStats,
} from '../controllers/feedback.controller.js';

const router = Router();

router.post('/submit', submitFeedback);
router.get('/list', getFeedbackList);
router.get('/stats', getStats);

export default router;
