import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './property.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('properties')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly cloudinaryService:CloudinaryService
  ) {}


  @Post()
  @UseInterceptors(FilesInterceptor('propertyImages', 3)) 
async create(
  @Body() createPropertyDto: CreatePropertyDto,
  @UploadedFiles() files: Express.Multer.File[],
): Promise<Property> {
  const imageUrls: string[] = []; 

  if (files && files.length > 0) {
    for (const file of files) {
      const result = await this.cloudinaryService.uploadImage(file, 'properties');
      imageUrls.push(result.secure_url); 
    }
  }

  createPropertyDto.propertyImages = imageUrls;
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

  @Get('inventory/:id')
  async findInventoryByProperTyid(@Param('id') id: string): Promise<Property> {
    const property = await this.propertyService.findInventoryByPropertyId(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }


  @Put(':id')
  @UseInterceptors(FilesInterceptor('propertyImages', 10))
async update(
  @Param('id') id: string,
  @Body() updatePropertyDto: UpdatePropertyDto,
  @UploadedFiles() files: Express.Multer.File[],
): Promise<Property> {
  const imageUrls: string[] = []; 

  if (files && files.length > 0) {
    for (const file of files) {
      const result = await this.cloudinaryService.uploadImage(file, 'properties');
      imageUrls.push(result.secure_url); 
    }
    updatePropertyDto.propertyImages = imageUrls;
  }

  const updatedProperty = await this.propertyService.update(id, updatePropertyDto);
  if (!updatedProperty) {
    throw new NotFoundException(`Property with ID ${id} not found`);
  }
  return updatedProperty;
}

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.propertyService.remove(id);
  }
}