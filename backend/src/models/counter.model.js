import mongoose from 'mongoose';

const Counter = new mongoose.Schema(
    {
      sequenceName: {
        type: String,
      },
      sequenceValue: {
        type: Number,
        default: 0,
      },
    },
);

export const CounterModel = mongoose.model('Counter', Counter);
