import { Router } from "express";
const router = Router();
import auth from './auth';
import school from './school';
import grade from './grade';

router.use('/auth', auth); 
router.use('/school', school); 
router.use('/grade', grade); 

export default router;