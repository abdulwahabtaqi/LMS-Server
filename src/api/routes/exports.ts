import { Router } from 'express';
const router = Router();
import multer from 'multer';

import { FetchQuestionsForExportHandler } from '../controllers/export';


router.post('/fetch/questions', FetchQuestionsForExportHandler );



export default router;

