import { IsString, IsOptional, IsMongoId, IsNumber, IsArray, IsDateString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  propertyName: string;

  @IsOptional()
  @IsString()
  reraNumber?: string;

  @IsMongoId()
  city: string;

  @IsMongoId()
  area: string;

  @IsString()
  pincode: string;

  @IsMongoId()
  propertyType: string;

  @IsMongoId()
  propertySubtype: string;

  @IsNumber()
  noOfBeds: number;

  @IsNumber()
  carpetArea: number;

  @IsNumber()
  floor: number;

  @IsArray()
  @IsMongoId({ each: true }) 
  amenities: string[];

  @IsDateString()
  possessionDate: string;

  @IsArray()
  @IsString({ each: true }) 
  propertyImages: string[];

  @IsNumber()
  minPrice: number;

  @IsNumber()
  maxPrice: number;

  @IsNumber()
  priceperSqrt: number;

  @IsString()
  maplink: string;

  @IsMongoId() 
  advisor: string;

  @IsString()
  description: string;

  @IsString()
  property_status: string;
}
