import { IsString, IsNotEmpty } from 'class-validator';
import { CreateAmenityDto } from './create-amenity.dto';

export class UpdateAmenityDto {
    @IsString()
    amenityName?: string;
  
    @IsString()
    status?: string;
  
    @IsString()
    imageUrl?: string;
  }
