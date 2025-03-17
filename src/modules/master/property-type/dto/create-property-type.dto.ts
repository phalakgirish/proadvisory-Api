
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropertyTypeDto {
  @IsString()
  @IsNotEmpty()
  ptname: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}