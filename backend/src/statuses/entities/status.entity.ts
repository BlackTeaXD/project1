import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Status extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ unique: true })
  title: string;

  @Prop()
  userId: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
StatusSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true
})
