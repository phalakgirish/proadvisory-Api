import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Staff', required: true })  
  staffId: Types.ObjectId;

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  MobileNo: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
