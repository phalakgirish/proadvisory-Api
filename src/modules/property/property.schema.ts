import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';
import { Amenity } from '../master/amenity/amenity.schema';
import { Area } from '../master/area/area.schema';
import { City } from '../master/city/schemas/city.schema';
import { PropertySubtype } from '../master/property-subtype/property-subtype.schema';
import { PropertyType } from '../master/property-type/property-type.schema';
import { Staff } from '../staff/staff.schema';

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true })
  propertyName: string;

  @Prop()
  reraNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'City' })
  city: City;

  @Prop({ type: Types.ObjectId, ref: 'Area' })
  area: Area;

  @Prop()
  pincode: string;

  @Prop({ type: Types.ObjectId, ref: 'PropertyType' })
  propertyType: PropertyType;

  @Prop({ type: Types.ObjectId, ref: 'PropertySubtype' })
  propertySubtype: PropertySubtype;

  @Prop()
  noOfBeds: number;

  @Prop()
  carpetArea: number;

  @Prop()
  floor: number;

  @Prop({ type: [Types.ObjectId], ref: 'Amenity' }) 
  amenities: Types.ObjectId[];

  @Prop()
  possessionDate: Date;

  @Prop({ type: [String] }) 
  propertyImages: string[];

  @Prop()
  price: number;

  @Prop()
  maplink: string;

  @Prop({ type: Types.ObjectId, ref: 'Staff' }) 
  advisor: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  property_status: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
