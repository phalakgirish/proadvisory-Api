import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';
import { Amenity, AmenitySchema } from './amenity.schema';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Amenity.name, schema: AmenitySchema }]),
    
    
  ],
  controllers: [AmenityController],
  providers: [AmenityService,CloudinaryService],
  exports: [MongooseModule],
})
export class AmenityModule {}