import {Router} from 'express';
import {
     FetchQuestionByIdHandler, FetchQuestionBySubTopicName, FetchQuestionsHandler,
     CreateQuestionHandler, DeleteQuestionHandler,UpdateQuestionHandler
} from '../controllers';
import {CreateQuestionValidator, UpdateQuestionValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateQuestionValidator,validationMiddleware,CreateQuestionHandler);
router.put('/update/:id',UpdateQuestionValidator,validationMiddleware,UpdateQuestionHandler);
router.get('/fetch', FetchQuestionsHandler);
router.get('/fetchById/:id',FetchQuestionByIdHandler);
router.get('/fetchByName/:name',FetchQuestionBySubTopicName);
router.delete('/deleteById/:id',DeleteQuestionHandler);

export default router;

