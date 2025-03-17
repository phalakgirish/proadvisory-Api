import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Header,
  NotFoundException,
} from '@nestjs/common';
import { PropertySubtypeService } from './property-subtype.service';
import { PropertySubtype } from './property-subtype.schema';
import { CreatePropertySubtypeDto } from './dto/create-property-subtype.dto';
import { UpdatePropertySubtypeDto } from './dto/update-property-subtype.dto';
import { Response } from 'express';
import { Types } from 'mongoose';

@Controller('property-subtypes')
export class PropertySubtypeController {
  constructor(private readonly propertySubtypeService: PropertySubtypeService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.propertySubtypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const propertySubtype = await this.propertySubtypeService.findOne(id);
    if (!propertySubtype) {
      throw new NotFoundException('Property subtype not found');
    }
    return propertySubtype;
  }

  @Post()
  async create(@Body() createPropertySubtypeDto: CreatePropertySubtypeDto): Promise<PropertySubtype> {
    return this.propertySubtypeService.create(createPropertySubtypeDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertySubtypeDto: UpdatePropertySubtypeDto,
  ): Promise<PropertySubtype> {
    const propertySubtype: PropertySubtype = {
      propertyType: updatePropertySubtypeDto.propertyType,
      pstname: updatePropertySubtypeDto.pstname,
      status: updatePropertySubtypeDto.status,
    } as PropertySubtype;
    const updatedPropertySubtype = await this.propertySubtypeService.update(id, propertySubtype);
    if (!updatedPropertySubtype) {
      throw new NotFoundException('Property subtype not found');
    }
    return updatedPropertySubtype;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PropertySubtype> {
    const deletedPropertySubtype = await this.propertySubtypeService.remove(id);
    if (!deletedPropertySubtype) {
      throw new NotFoundException('Property subtype not found');
    }
    return deletedPropertySubtype;
  }

 
}