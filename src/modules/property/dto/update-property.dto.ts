import { IsString, IsOptional, IsMongoId, IsNumber, IsArray, IsDateString, IsBoolean } from 'class-validator';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  propertyName?: string;

  @IsOptional()
  @IsString()
  reraNumber?: string;

  @IsOptional()
  @IsMongoId()
  city?: string;

  @IsOptional()
  @IsMongoId()
  area?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsMongoId()
  propertyType?: string;

  @IsOptional()
  @IsMongoId()
  propertySubtype?: string;

  @IsOptional()
  @IsNumber()
  noOfBeds?: number;

  @IsOptional()
  @IsNumber()
  noOfBaths?: number;

  @IsOptional()
  @IsNumber()
  carpetArea?: number;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsDateString()
  possessionDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  propertyImages?: string[];

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsNumber()
  priceperSqrt: number;

  @IsOptional()
  @IsString()
  maplink?: string;

  @IsOptional()
  @IsMongoId()
  advisor?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isnewlaunch:Boolean;
  
  @IsOptional()
  @IsBoolean()
  isfeature:Boolean

  @IsOptional()
  @IsBoolean()
  isverified:Boolean;
  
  @IsOptional()
  @IsBoolean()
  isforsale:Boolean;

  @IsOptional()
  @IsString()
  property_status?: string;
}
