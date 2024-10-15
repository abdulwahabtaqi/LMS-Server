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
import image from './image';
import users from './users';
import connection from './connection';
import teacher from './teacher';
import assignment from './assignment';
import test from './Test';


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
router.use('/image', Authentication, Authorization(["admin"]), image);
router.use('/users', Authentication, Authorization(["admin"]), users);
router.use('/teachers', Authentication, teacher);
router.use('/connection', Authentication, connection);
router.use('/assignment', Authentication, assignment);
router.use('/test', test);

export default router;