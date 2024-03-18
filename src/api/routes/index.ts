import { Router } from "express";
const router = Router();

import auth from './auth';
import school from './school';
import grade from './grade';
import subject from './subject';
import topic from './topic';
import subTopic from './subTopic';
import insights from './insights';
import question from './question';
import answer from './answer';
import imports from './imports';
import exporter from './exports';
import { Authentication, Authorization } from "@/middlewares";

router.use('/auth', auth);
router.use('/insights', insights);
router.use('/school', Authentication, Authorization(["admin"]), school);
router.use('/grade', Authentication, Authorization(["admin"]), grade);
router.use('/subject', Authentication, Authorization(["admin"]), subject);
router.use('/topic', Authentication, Authorization(["admin"]), topic);
router.use('/subTopic', Authentication, Authorization(["admin"]), subTopic);
router.use('/question', Authentication, Authorization(["admin"]), question);
router.use('/answer', Authentication, Authorization(["admin"]), answer);
router.use('/imports', imports);
router.use('/exporter', Authentication, Authorization(["admin"]), exporter);

export default router;