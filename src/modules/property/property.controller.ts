import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './property.schema';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return await this.propertyService.create(createPropertyDto);
  }

  @Get()
  async findAll(): Promise<Property[]> {
    return await this.propertyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Property> {
    const property = await this.propertyService.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.propertyService.remove(id);
  }
}
