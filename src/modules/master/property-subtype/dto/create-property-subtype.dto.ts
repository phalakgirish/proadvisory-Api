

import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePropertySubtypeDto {
  @IsString()
  @IsNotEmpty()
  propertyType: Types.ObjectId; 

  @IsString()
  @IsNotEmpty()
  pstname: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}