import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import asyncHandler from 'express-async-handler';

const getAll = asyncHandler(async (_, res) => {
  const orders = await db.orders.find().toArray();
  const products = await db.inventory.find().toArray();

  const ordersMapping = orders.map(order => {
    const existingProduct = products.find(product => product.sku === order.item);
    if (existingProduct) {
      const ordersWithDescription = {
        ...order,
        description: existingProduct.description
      };
      return ordersWithDescription;
    }
  });

  res.json({ result: ordersMapping });
});

const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;

  const existingProduct = await db.inventory.findOne({ _id: ObjectId(id) });
  if (!existingProduct) {
    res.status(400);
    throw new Error('Product not found');
  }

  const newOrder = {
    item: existingProduct.sku,
    price,
    quantity
  };

  await db.orders.insertOne(newOrder);

  res.status(201).json({ message: 'Order created' });
});

const OrderController = {
  getAll,
  createOrder
};

export default OrderController;
