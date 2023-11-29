import {Router} from 'express';
import {FetchGradeByGradeNameHandler, FetchGradeByIdHandler,FetchGradesHandler,
    CreateGradeHandler, UpdateGradeHandler, DeleteGradeHandler,
    FetchGradeBySchoolTypeHandler
} from '../controllers';
import { CreateGradeValidator, UpdateGradeValidator} from '@/validators';
const router = Router();

router.post('/create',CreateGradeValidator,CreateGradeHandler);
router.post('/update',UpdateGradeValidator,UpdateGradeHandler);
router.post('/fetch',FetchGradesHandler);
router.post('/fetchById/:id',FetchGradeByIdHandler);
router.post('/fetchByName/:gradeName',FetchGradeByGradeNameHandler);
router.post('/fetchBySchoolType/:type',FetchGradeBySchoolTypeHandler);
router.post('/deleteById/:id',DeleteGradeHandler);

export default router;

