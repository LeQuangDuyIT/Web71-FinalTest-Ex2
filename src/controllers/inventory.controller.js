import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getAll = asyncHandler(async (_, res) => {
  const products = await db.inventory.find().toArray();
  res.json({ result: products });
});

const getByMaxQuantity = asyncHandler(async (req, res) => {
  console.log(req);
  const maxQuantity = req.query.value ?? 100;

  const products = await db.inventory.find({ instock: { $lte: +maxQuantity } }).toArray();
  res.json({ result: products });
});

const InventoryController = {
  getAll,
  getByMaxQuantity
};

export default InventoryController;
