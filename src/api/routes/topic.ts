import {Router} from 'express';
import {FetchTopicByIdHandler, FetchTopicByTopicNameHandler, 
     FetchTopicBySubjectNameHandler,
     FetchTopicsHandler, CreateTopicHandler, 
     DeleteTopicHandler, UpdateTopicHandler
} from '../controllers';
import { CreateTopicValidator, UpdateTopicValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateTopicValidator,validationMiddleware,CreateTopicHandler);
router.put('/update/:id',UpdateTopicValidator,validationMiddleware,UpdateTopicHandler);
router.get('/fetch',FetchTopicsHandler);
router.get('/fetchById/:id',FetchTopicByIdHandler);
router.get('/fetchByName/:name',FetchTopicByTopicNameHandler);
router.get('/fetchBySubject/:subject',FetchTopicBySubjectNameHandler);
router.delete('/deleteById/:id', DeleteTopicHandler);

export default router;

