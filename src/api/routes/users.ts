import { Router } from 'express';
import { getAllUsers, deleteUser, getSingleUser, updateUser, approveUser, unapprovedUser } from '../controllers/users/users';

const router = Router();
router.get('/all', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', getSingleUser);
router.put('/user/:id', updateUser);
router.put('/approve/:id', approveUser);
router.get('/all/unapproved', unapprovedUser);


export default router;

