// dto/create-inventory.dto.ts (NestJS)

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  inventoryName: string;

  @IsString()
  @IsNotEmpty()
  noOfBKH: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}