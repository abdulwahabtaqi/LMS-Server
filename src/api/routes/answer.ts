import {Router} from 'express';
import {
     FetchAnswerByIdHandler, FetchAnswersHandler,CreateAnswerHandler, DeleteAnswerHandler,
     UpdateAnswerHandler, FetchAnswerByNameHandler
} from '../controllers';
import {CreateAnswerValidator, UpdateAnswerValidator} from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/create',CreateAnswerValidator,validationMiddleware,CreateAnswerHandler);
router.put('/update/:id',UpdateAnswerValidator,validationMiddleware,UpdateAnswerHandler);
router.get('/fetch', FetchAnswersHandler);
router.get('/fetchById/:id',FetchAnswerByIdHandler);
router.get('/fetchByName/:name',FetchAnswerByNameHandler);
router.delete('/deleteById/:id',DeleteAnswerHandler);

export default router;

