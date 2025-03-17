
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropertySubtypeDto {
  @IsString()
  @IsNotEmpty()
  propertyType: string; 

  @IsString()
  @IsNotEmpty()
  pstname: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}