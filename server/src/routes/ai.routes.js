import { Router } from 'express';
import { getQwenExecutiveBriefing, getGemmaExecutiveBriefing } from '../controllers/ai.controller.js';

const router = Router();

router.post('/qwen-summary', getQwenExecutiveBriefing);
router.post('/gemma-summary', getGemmaExecutiveBriefing);

export default router;
