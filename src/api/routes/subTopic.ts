import {Router} from 'express';
import {FetchSubTopicByIdHandler, FetchSubTopicBySubTopicName, FetchSubTopicByTopicName,
     FetchSubTopicsHandler, CreateSubTopicHandler, DeleteSubTopicHandler,
     UpdateSubTopicHandler
} from '../controllers';
import { CreateSubTopicValidator, UpdateSubTopicValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateSubTopicValidator,validationMiddleware,CreateSubTopicHandler);
router.put('/update/:id',UpdateSubTopicValidator,validationMiddleware,UpdateSubTopicHandler);
router.get('/fetch',FetchSubTopicsHandler);
router.get('/fetchById/:id',FetchSubTopicByIdHandler);
router.get('/fetchByName/:name/:topicId',FetchSubTopicBySubTopicName);
router.get('/fetchByGrade/:topic',FetchSubTopicByTopicName);
router.delete('/deleteById/:id',DeleteSubTopicHandler);

export default router;

