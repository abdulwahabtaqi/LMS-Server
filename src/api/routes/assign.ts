import { Router } from 'express';
const router = Router();
import { createAssignment, deleteAssignment, getConnAssign, getTeacherAssignments } from '../controllers/assign/assignment';

router.post('/create', createAssignment);
router.get('/all/:id', getConnAssign);
router.get('/my/:id', getTeacherAssignments);
router.delete('/delete/:id/teacher/:teacherId', deleteAssignment);


export default router;

