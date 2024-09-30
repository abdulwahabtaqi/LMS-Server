import { Router } from 'express';

import { deleteImage, getAllImages, uploadImage } from '../controllers/imageUpload/uploadImage';

const router = Router();


router.post('/upload', uploadImage);
router.get('/all', getAllImages);
router.delete('/delete/:id', deleteImage);

export default router;
