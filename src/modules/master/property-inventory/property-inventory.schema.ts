import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Property } from 'src/modules/property/property.schema';
import { Area } from '../area/area.schema';
import { Inventory } from '../inventory/inventory.schema';


@Schema({ timestamps: true })
export class PropertyInventory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Property'})
  property: Property;
  
  @Prop({ type: Types.ObjectId, ref: 'Inventory'})
  inventory: Inventory;

  @Prop()
  carpetArea: number;

  @Prop()
  buildUpArea: number;

  @Prop({ required: true })
  minPrice: number;

  @Prop({ required: true })
  maxPrice: number;

  @Prop()
  floorPlan: string;
}

export const PropertyInventorySchema = SchemaFactory.createForClass(PropertyInventory);