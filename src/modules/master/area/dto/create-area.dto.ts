import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAreaDto {
  @IsNotEmpty()
  cname: Types.ObjectId; // City ID reference

  @IsString()
  @IsNotEmpty()
  aname: string;

  @IsString()
  @IsOptional()
  pincode?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
