import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Task extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: number;

  @Prop()
  labels: number[];

  @Prop()
  assignee: number;

  @Prop()
  author: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
