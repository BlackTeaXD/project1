import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pick from 'lodash.pick';

import { UserModel } from '../models';
import { getNextSequenceValue } from '../helpers';

export const generateAccessToken = (id) => {
  return promisify(jwt.sign)(
      { id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME },
  )
}

export const signUp = async (userData) => {
  const userWithSameEmail = await UserModel.findOne({ email: userData.email });
  if (userWithSameEmail) {
    throw { name: 'UserDuplication', message: 'User already exists', statusCode: 409 };
  }

  const id = await getNextSequenceValue('user');
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return UserModel.findOneAndUpdate(
      { email: userData.email },
      { ...userData, password: hashedPassword, id },
      { new: true, upsert: true },
  ).select({ _id: 0, id: 1, firstname: 1, lastname: 1, email: 1 }).exec();
};

export const signIn = async (userData) => {
  const savedUser = await UserModel.findOne({ email: userData.email }).exec();
  if (!savedUser) {
    throw { name: 'InvalidCredentials', message: 'Incorrect email or password', statusCode: 401 };
  }

  const isValidPassword = await bcrypt.compare(userData.password, savedUser.password);
  if (!isValidPassword) {
    throw { name: 'InvalidCredentials', message: 'Incorrect email or password', statusCode: 401 };
  }

  return pick(savedUser, ['id', 'firstname', 'lastname', 'email']);
};

