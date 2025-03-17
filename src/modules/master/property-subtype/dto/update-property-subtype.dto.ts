
import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePropertySubtypeDto {
  @IsMongoId()
  @IsOptional()
  propertyType?: Types.ObjectId;

  @IsString()
  @IsOptional()
  pstname?: string;

  @IsString()
  @IsOptional()
  status?: string;
}