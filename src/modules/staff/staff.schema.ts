import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Staff extends Document {
  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  MobileNo: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  userType: string;

  @Prop({ required: true })
  joiningDate: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
