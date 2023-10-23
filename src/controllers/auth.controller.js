import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  // Check username
  const existingUser = await db.users.findOne({ username });
  if (!existingUser) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatchedPassword = password === existingUser.password;

  if (!isMatchedPassword) {
    res.status(400);
    throw new Error('Email or password is not valid');
  }

  // Phát hành accessToken bằng JSON Web Token
  const payload = {
    id: existingUser._id,
    username: existingUser.username
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });

  // Response
  res.json({
    message: 'Login successfully',
    accessToken: token
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await db.users.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        password: 0
      }
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error('Unauthorized, please try again!');
  }

  res.json(currentUser);
});

const AuthController = {
  login,
  fetchCurrentUser
};

export default AuthController;
