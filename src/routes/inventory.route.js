import express from 'express';
import InventoryController from '../controllers/inventory.controller.js';

const router = express();

router.get('/', InventoryController.getAll);
router.get('/quantity/max', InventoryController.getByMaxQuantity)


export default router;
