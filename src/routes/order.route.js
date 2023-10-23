import express from 'express';
import OrderController from '../controllers/order.controller.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import orderValidator from '../valdationSchema/order.validator.js';

const router = express();

router.get('/', OrderController.getAll);
router.post('/', validateMdw(orderValidator.createOrderSchema), OrderController.createOrder);

export default router;
