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
  @IsMongoId()
  area?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  price?: number;

  @IsOptional()
  @IsString()
  floorPlan?: string;
}
