import { Router } from 'express';
const router = Router();

import { downloadCsv } from '../controllers/downloadCsv/downloadCsv';


router.get('/download', downloadCsv);



export default router;

