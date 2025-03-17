// dto/update-inventory.dto.ts (NestJS)

import { IsString, IsOptional } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  @IsOptional()
  inventoryName?: string;

  @IsString()
  @IsOptional()
  noOfBKH?: string;

  @IsString()
  @IsOptional()
  status?: string;
}