import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PropertyInventoryService } from './property-inventory.service';
import { CreatePropertyDto } from './dto/create-property-inventory.dto';
import { UpdatePropertyInventoryDto } from './dto/update-property-inventory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('property-inventory')
export class PropertyInventoryController {
  constructor(private readonly service: PropertyInventoryService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('floorPlan'),
  )
  async create(@Body() data: CreatePropertyDto, @UploadedFile() file: Express.Multer.File) {
    if(file != undefined)
      {
          const result_floorPlan = await this.cloudinaryService.uploadImage(file,'uploads');
          data.floorPlan = result_floorPlan.secure_url;
  
      }
    return this.service.create(data);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('floorPlan'),
  )
  async update(@Param('id') id: string, @Body() data: UpdatePropertyInventoryDto, @UploadedFile() file?: Express.Multer.File) {
    if(file != undefined)
      {
          const result_floorPlan = await this.cloudinaryService.uploadImage(file,'uploads');
          data.floorPlan = result_floorPlan.secure_url;
  
      }
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
