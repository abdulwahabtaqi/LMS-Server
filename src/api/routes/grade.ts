import {Router} from 'express';
import {FetchGradeByGradeNameHandler, FetchGradeByIdHandler,FetchGradesHandler,
    CreateGradeHandler, UpdateGradeHandler, DeleteGradeHandler,
    FetchGradeBySchoolTypeHandler, FetchGradeBySchoolIdHandler
} from '../controllers';
import { CreateGradeValidator, UpdateGradeValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateGradeValidator,validationMiddleware,CreateGradeHandler);
router.put('/update/:id',UpdateGradeValidator,validationMiddleware,UpdateGradeHandler);
router.get('/fetch',FetchGradesHandler);
router.get('/fetchById/:id',FetchGradeByIdHandler);
router.get('/fetchBySchoolId/:id',FetchGradeBySchoolIdHandler);
router.get('/fetchByName/:name',FetchGradeByGradeNameHandler);
router.get('/fetchBySchoolType/:type',FetchGradeBySchoolTypeHandler);
router.delete('/deleteById/:id',DeleteGradeHandler);

export default router;

