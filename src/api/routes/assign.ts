import { Router } from 'express';
const router = Router();
import { createAssignment, getConnAssign } from '../controllers/assign/assignment';

router.post('/create', createAssignment);
router.get('/all/:id', getConnAssign);


export default router;

