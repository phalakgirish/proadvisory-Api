import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Amenity extends Document {
  @Prop()
  amenityName: string;

  @Prop()
  status: string;

  @Prop()
  imageUrl: string;
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);