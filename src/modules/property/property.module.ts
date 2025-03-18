import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Amenity, AmenitySchema } from '../master/amenity/amenity.schema';
import { Area, AreaSchema } from '../master/area/area.schema';
import { City, CitySchema } from '../master/city/schemas/city.schema';
import { PropertySubtype, PropertySubtypeSchema } from '../master/property-subtype/property-subtype.schema';
import { PropertyType, PropertyTypeSchema } from '../master/property-type/property-type.schema';
import { User, UserSchema } from '../user/user.schema';
import { Property, PropertySchema } from './property.schema';
import { StaffSchema } from '../staff/staff.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: User.name, schema: StaffSchema }, // To populate advisorName
      { name: Amenity.name, schema: AmenitySchema },
      { name: Area.name, schema: AreaSchema },
      { name: City.name, schema: CitySchema },
      { name: PropertySubtype.name, schema: PropertySubtypeSchema },
      { name: PropertyType.name, schema: PropertyTypeSchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService,CloudinaryService],
  exports: [PropertyService], 
})
export class PropertyModule {}
