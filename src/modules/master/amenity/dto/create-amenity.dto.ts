import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAmenityDto {
    @IsString()
    @IsNotEmpty()
    amenityName: string;
  
    @IsString()
    @IsNotEmpty()
    status: string;
  
    @IsString()
    imageUrl?: string;
  }