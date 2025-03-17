
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PropertySubtype extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PropertyType' })
  propertyType: Types.ObjectId;

  @Prop()
  pstname: string;

  @Prop()
  status: string;
}

export const PropertySubtypeSchema = SchemaFactory.createForClass(PropertySubtype);