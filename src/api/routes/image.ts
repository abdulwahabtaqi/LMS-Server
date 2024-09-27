import { Router } from 'express';

import { uploadImage } from '../controllers/imageUpload/uploadImage';

const router = Router();


router.post('/upload', uploadImage);

export default router;
