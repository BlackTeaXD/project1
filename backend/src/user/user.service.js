import { UserModel } from '../models';

export const getUsers = () => UserModel.find(
    {},
    { _id: 0, id: 1, email: 1, firstname: 1, lastname: 1, createdAt: 1 },
).exec();

export const updateUser = (userId, userData) => UserModel.findOneAndUpdate(
    { id: userId },
    { ...userData },
    { new: true },
).select({ _id: 0, id: 1, firstname: 1, lastname: 1, email: 1, createdAt: 1 }).exec();

export const deleteUser = (userId) => UserModel.deleteOne({ id: userId }).exec();
