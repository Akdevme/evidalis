import { Router } from 'express';
import {
  analyzeFeedback,
  getAdaptionState,
  recalibrateEngine,
  testConnection,
  triggerCloudJob,
  getCloudDatasets,
} from '../controllers/adaption.controller.js';

const router = Router();

router.get('/state', getAdaptionState);
router.get('/cloud-datasets', getCloudDatasets);
router.post('/analyze', analyzeFeedback);
router.post('/recalibrate', recalibrateEngine);
router.post('/test-connection', testConnection);
router.post('/trigger-cloud-job', triggerCloudJob);

export default router;
