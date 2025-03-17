
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PropertyType extends Document {
  @Prop()
  ptname: string;

  @Prop()
  status: string;
}

export const PropertyTypeSchema = SchemaFactory.createForClass(PropertyType);