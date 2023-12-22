import { Router } from 'express';
const router = Router();
import multer from 'multer';

import { FetchQuestionsForExportHandler } from '../controllers/export';

const storage = multer.memoryStorage();

router.get('/get/questions', FetchQuestionsForExportHandler );



export default router;

