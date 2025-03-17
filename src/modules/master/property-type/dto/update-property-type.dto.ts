
import { IsString, IsOptional } from 'class-validator';

export class UpdatePropertyTypeDto {
  @IsString()
  @IsOptional()
  ptname?: string;

  @IsString()
  @IsOptional()
  status?: string;
}