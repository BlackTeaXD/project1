import { CounterModel } from '../models';

export const getNextSequenceValue = async (sequenceName) => {
  const { sequenceValue } = await CounterModel.findOneAndUpdate(
      { sequenceName },
      { $inc: { sequenceValue: 1 } },
      { new: true },
  ).exec();

  return sequenceValue;
};
