
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
import { PropertyTypeService } from './property-type.service';
import { PropertyType } from './property-type.schema';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { Response } from 'express';

@Controller('property-types')
export class PropertyTypeController {
  constructor(private readonly propertyTypeService: PropertyTypeService) {}

  @Get()
  async findAll(): Promise<PropertyType[]> {
    return this.propertyTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PropertyType> {
    const propertyType = await this.propertyTypeService.findOne(id);
    if (!propertyType) {
      throw new NotFoundException('Property type not found');
    }
    return propertyType;
  }

  @Post()
  async create(@Body() createPropertyTypeDto: CreatePropertyTypeDto): Promise<PropertyType> {
    const propertyType: PropertyType = {
      ptname: createPropertyTypeDto.ptname,
      status: createPropertyTypeDto.status,
    } as PropertyType;
    return this.propertyTypeService.create(propertyType);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyTypeDto: UpdatePropertyTypeDto,
  ): Promise<PropertyType> {
    const propertyType: PropertyType = {
      ptname: updatePropertyTypeDto.ptname,
      status: updatePropertyTypeDto.status,
    } as PropertyType;
    const updatedPropertyType = await this.propertyTypeService.update(id, propertyType);
    if (!updatedPropertyType) {
      throw new NotFoundException('Property type not found');
    }
    return updatedPropertyType;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PropertyType> {
    const deletedPropertyType = await this.propertyTypeService.remove(id);
    if (!deletedPropertyType) {
      throw new NotFoundException('Property type not found');
    }
    return deletedPropertyType;
  }

 
}