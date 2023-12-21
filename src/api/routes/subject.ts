import {Router} from 'express';
import {FetchSubjectByGradeHandler, FetchSubjectByIdHandler,
     FetchSubjectBySubjectNameHandler,
      FetchSubjectsHandler, CreateSubjectHandler,
       DeleteSubjectHandler, UpdateSubjectHandler
} from '../controllers';
import {  CreateSubjectValidator, UpdateSubjectValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateSubjectValidator,validationMiddleware,CreateSubjectHandler);
router.put('/update/:id',UpdateSubjectValidator,validationMiddleware,UpdateSubjectHandler);
router.get('/fetch',FetchSubjectsHandler);
router.get('/fetchById/:id',FetchSubjectByIdHandler);
router.get('/fetchByName/:name',FetchSubjectBySubjectNameHandler);
router.get('/fetchByGradeId/:id',FetchSubjectByGradeHandler);
router.delete('/deleteById/:id',DeleteSubjectHandler);

export default router;

