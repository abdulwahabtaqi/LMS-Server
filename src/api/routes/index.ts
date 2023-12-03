import { Router } from "express";
const router = Router();

import auth from './auth';
import school from './school';
import grade from './grade';
import subject from './subject';
import topic from './topic';
import subTopic from './subTopic';
import { Authentication,Authorization  } from "@/middlewares";

router.use('/auth', auth); 
router.use('/school',Authentication,Authorization(["admin"]), school); 
router.use('/grade', Authentication,Authorization(["admin"]), grade); 
router.use('/subject', Authentication,Authorization(["admin"]), subject); 
router.use('/topic', Authentication,Authorization(["admin"]), topic); 
router.use('/subTopic', Authentication,Authorization(["admin"]), subTopic); 

export default router;