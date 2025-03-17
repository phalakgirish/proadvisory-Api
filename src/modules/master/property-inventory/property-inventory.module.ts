import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyInventory, PropertyInventorySchema,  } from '../property-inventory/property-inventory.schema';
import { PropertyInventoryService } from './property-inventory.service';
import { PropertyInventoryController } from './property-inventory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PropertyInventory.name, schema: PropertyInventorySchema }]),
  ],
  controllers: [PropertyInventoryController],
  providers: [PropertyInventoryService],
})
export class PropertyInventoryModule {}