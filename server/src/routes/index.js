import { Router } from 'express';
import healthRoutes from './health.routes.js';
import adaptionRoutes from './adaption.routes.js';
import feedbackRoutes from './feedback.routes.js';
import aiRoutes from './ai.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/adaption', adaptionRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/ai', aiRoutes);

export default router;
