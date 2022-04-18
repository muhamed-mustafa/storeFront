import express from 'express';
import {
  createUser,
  getAllUsers,
  showUserById,
} from '../controllers/user.controller';
import { verifyAuthToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/users', verifyAuthToken, getAllUsers);
router.get('/users/:id', verifyAuthToken, showUserById);
router.post('/users', createUser);

export { router as usersRouter };
