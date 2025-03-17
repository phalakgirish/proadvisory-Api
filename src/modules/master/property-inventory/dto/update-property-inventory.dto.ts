
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property-inventory.dto';

export class UpdatePropertyInventoryDto extends PartialType(CreatePropertyDto) {

}

