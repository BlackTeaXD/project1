import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
      id: {
        type: Number,
      },
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
    },
    { timestamps: true },
);

export const UserModel = mongoose.model('User', User);
