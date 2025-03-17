
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { City } from '../city/schemas/city.schema';

@Schema({ timestamps: true })
export class Area extends Document {
  @Prop({ type: Types.ObjectId, ref: 'City'})
  cname: City;

  @Prop()
  aname: string;

  @Prop()
  pincode: string;

  @Prop()
  status: string;
}

export const AreaSchema = SchemaFactory.createForClass(Area);