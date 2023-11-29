import {Router} from 'express';
import {LoginHandler, RegistrationHandler} from '../controllers';
import { LoginValidator, RegistrationValidator } from '@/validators';
const router = Router();

router.post('/login',LoginValidator,LoginHandler);
router.post('/register',RegistrationValidator,RegistrationHandler);

export default router;

