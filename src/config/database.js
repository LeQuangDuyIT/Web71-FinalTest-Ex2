import { MongoClient } from 'mongodb';

const DATABASE = 'web71-final-test';
const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    console.log('Database connected successfully');
    const database = mongoClient.db(DATABASE);

    // Collections
    db.inventory = database.collection('Inventory');
    db.users = database.collection('Users');
    db.orders = database.collection('Order');
  } catch (error) {
    console.error('Connect to DB failed:', error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
