import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './entities/counter.entity';
import { SequenceName } from './enums/sequence-name.enum';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
  ) {}

  async getNextSequenceValue(sequenceName: SequenceName) {
    const { sequenceValue } = await this.counterModel
      .findOneAndUpdate(
        { sequenceName },
        { $inc: { sequenceValue: 1 } },
        { new: true },
      )
      .exec();

    return sequenceValue;
  }
}
