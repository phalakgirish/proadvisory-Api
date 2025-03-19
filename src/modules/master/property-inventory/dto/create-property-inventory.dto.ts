import { IsString, IsNumber, Min, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'stream';

export class CreatePropertyDto {
  @IsOptional()
  @IsMongoId()
  property?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  inventory?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  buildUpArea?: number;

  @IsOptional()
 @IsNumber()
  carpetArea?: number;

  @IsNotEmpty()
  @IsNumber()
  minPrice: number;

  @IsNotEmpty()
  @IsNumber()
  maxPrice: number;

  @IsOptional()
  @IsString()
  floorPlan?: string;
}
