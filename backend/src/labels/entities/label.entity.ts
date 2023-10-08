import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Label extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ unique: true })
  title: string;

  @Prop()
  userId: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
LabelSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true
})
