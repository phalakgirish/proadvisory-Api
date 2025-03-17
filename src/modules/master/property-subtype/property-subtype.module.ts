import { Module } from '@nestjs/common';
import { PropertySubtypeService } from './property-subtype.service';
import { PropertySubtypeController } from './property-subtype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertySubtype, PropertySubtypeSchema } from './property-subtype.schema';
import { PropertyTypeModule } from '../property-type/property-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PropertySubtype.name, schema: PropertySubtypeSchema }]),
    PropertyTypeModule,
  ],
  controllers: [PropertySubtypeController],
  providers: [PropertySubtypeService],
})
export class PropertySubtypeModule {}
