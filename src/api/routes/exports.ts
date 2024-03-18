import { Router } from 'express';
const router = Router();

import { FetchQuestionsForExportHandler, ReserveQuestionAsPractice, fetchReserveQuestionsHandler } from '../controllers/export';
import { removeDownloadHistoryCommandHandler } from '../controllers/export/removeDownloadHistoryCommandHandler';


router.post('/fetch/questions', FetchQuestionsForExportHandler);
router.get('/fetch/download-history', fetchReserveQuestionsHandler);
router.post('/reservedQuestions', ReserveQuestionAsPractice);
router.get('/removeDownloadHistory/:id', removeDownloadHistoryCommandHandler);


export default router;

