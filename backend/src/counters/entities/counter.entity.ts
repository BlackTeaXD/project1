import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop()
  sequenceName: string;

  @Prop()
  sequenceValue: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
