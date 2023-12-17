import { Router } from 'express';
import { FetchDashboardInsightsHandler } from '../controllers/dashboard/fetchDashboardInsights';

const router = Router();
router.get('/fetchDashboardInsights', FetchDashboardInsightsHandler);


export default router;

