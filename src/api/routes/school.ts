import { Router } from 'express';
import {
    CreateSchoolHandler, UpdateSchoolHandler, FetchSchoolByTypeHandler,
    FetchSchoolsHandler, DeleteSchoolHandler, FetchSchoolByIdHandler
} from '../controllers';
import { CreateSchoolValidator, UpdateSchoolValidator } from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create', CreateSchoolValidator,validationMiddleware, CreateSchoolHandler);
router.put('/update/:id', UpdateSchoolValidator,validationMiddleware, UpdateSchoolHandler);
router.get('/fetch', FetchSchoolsHandler);
router.get('/fetchById/:id', FetchSchoolByIdHandler);
router.get('/fetchByType/:type', FetchSchoolByTypeHandler);
router.delete('/deleteById/:id', DeleteSchoolHandler);

export default router;

