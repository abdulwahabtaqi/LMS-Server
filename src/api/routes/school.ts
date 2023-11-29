import {Router} from 'express';
import {CreateSchoolHandler, UpdateSchoolHandler, FetchSchoolByTypeHandler, 
    FetchSchoolsHandler, DeleteSchoolHandler,FetchSchoolByIdHandler
} from '../controllers';
import { CreateSchoolValidator, UpdateSchoolValidator} from '@/validators';
const router = Router();

router.post('/create',CreateSchoolValidator,CreateSchoolHandler);
router.post('/update',UpdateSchoolValidator,UpdateSchoolHandler);
router.post('/fetch',FetchSchoolsHandler);
router.post('/fetchById/:id',FetchSchoolByIdHandler);
router.post('/fetchByType/:type',FetchSchoolByTypeHandler);
router.post('/deleteById/:id',DeleteSchoolHandler);

export default router;

