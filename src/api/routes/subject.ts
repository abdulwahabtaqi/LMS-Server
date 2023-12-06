import {Router} from 'express';
import {FetchSubjectByGradeHandler, FetchSubjectByIdHandler,
     FetchSubjectBySubjectNameHandler,
      FetchSubjectsHandler, CreateSubjectHandler,
       DeleteSubjectHandler, UpdateSubjectHandler
} from '../controllers';
import {  CreateTopicValidator, UpdateTopicValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateTopicValidator,validationMiddleware,CreateSubjectHandler);
router.put('/update/:id',UpdateTopicValidator,validationMiddleware,UpdateSubjectHandler);
router.get('/fetch',FetchSubjectsHandler);
router.get('/fetchById/:id',FetchSubjectByIdHandler);
router.get('/fetchByName/:name',FetchSubjectBySubjectNameHandler);
router.get('/fetchByGrade/:grade',FetchSubjectByGradeHandler);
router.delete('/deleteById/:id',DeleteSubjectHandler);

export default router;

