import {Router} from 'express';
import {LoginHandler, RegistrationHandler} from '../controllers';
import { LoginValidator, RegistrationValidator } from '@/validators';
import { validationMiddleware } from '@/middlewares';
const router = Router();

router.post('/login',LoginValidator, validationMiddleware,LoginHandler);
router.post('/registration',RegistrationValidator, validationMiddleware,RegistrationHandler);

export default router;

