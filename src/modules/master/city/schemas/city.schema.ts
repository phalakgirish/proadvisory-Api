import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;
@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  cname: string;

  @Prop({ required: true })
  status: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
