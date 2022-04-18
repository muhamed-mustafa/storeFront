import express from 'express';
import {
  createProduct,
  getAllProducts,
  showProductById,
} from '../controllers/product.controller';
import { verifyAuthToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/product', verifyAuthToken, getAllProducts);
router.get('/product/:id', verifyAuthToken, showProductById);
router.post('/product', verifyAuthToken, createProduct);

export { router as productRouter };
