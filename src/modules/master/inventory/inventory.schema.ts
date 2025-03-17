// inventory.schema.ts (NestJS)

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Inventory extends Document {
  @Prop()
  inventoryName: string;

  @Prop()
  noOfBKH: string;

  @Prop()
  status: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);