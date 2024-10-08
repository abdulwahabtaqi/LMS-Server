import { Router } from 'express';
import { getAllUsers, deleteUser, getSingleUser, updateUser } from '../controllers/users/users';

const router = Router();
router.get('/all', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', getSingleUser);
router.put('/user/:id', updateUser);


export default router;

