import {Router} from 'express';
import {FetchSubTopicByIdHandler, FetchSubTopicBySubTopicName, FetchSubTopicByTopicName,
     FetchSubTopicsHandler, CreateSubTopicHandler, DeleteSubTopicHandler,
     UpdateSubTopicHandler
} from '../controllers';
import { CreateSubTopicValidator, UpdateSubTopicValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
import { FetchSubTopicByTopicIdHandler } from '../controllers/subTopic/fetchSubTopicByTopicId';
const router = Router();

router.post('/create',CreateSubTopicValidator,validationMiddleware,CreateSubTopicHandler);
router.put('/update/:id',UpdateSubTopicValidator,validationMiddleware,UpdateSubTopicHandler);
router.get('/fetch',FetchSubTopicsHandler);
router.get('/fetchById/:id',FetchSubTopicByIdHandler);
router.get('/fetchByName/:name',FetchSubTopicBySubTopicName);
router.get('/fetchByTopic/:topic',FetchSubTopicByTopicName);
router.get('/fetchByTopicId/:id',FetchSubTopicByTopicIdHandler);
router.delete('/deleteById/:id',DeleteSubTopicHandler);

export default router;

