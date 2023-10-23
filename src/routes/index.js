import express from 'express';
import inventoryRouter from './inventory.route.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import authRouter from './auth.route.js';
import orderRouter from './order.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/orders', authMiddleware, orderRouter);
router.use('/products', authMiddleware, inventoryRouter);

export default router;
