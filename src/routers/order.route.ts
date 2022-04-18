import express from 'express';
import {
  createOrder,
  getAllOrders,
  showOrderById,
} from '../controllers/order.controller';
import { verifyAuthToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/orders/:userId', verifyAuthToken, getAllOrders);
router.get('/order/:id', verifyAuthToken, showOrderById);
router.post('/order', verifyAuthToken, createOrder);

export { router as orderRouter };
