import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PropertyInventoryService } from './property-inventory.service';
import { CreatePropertyDto } from './dto/create-property-inventory.dto';
import { UpdatePropertyInventoryDto } from './dto/update-property-inventory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('property-inventory')
export class PropertyInventoryController {
  constructor(private readonly service: PropertyInventoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('floorPlan', {
      storage: diskStorage({
        destination: './uploads/floorplans',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@Body() data: CreatePropertyDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.floorPlan = `/uploads/floorplans/${file.filename}`;
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
    FileInterceptor('floorPlan', {
      storage: diskStorage({
        destination: './uploads/floorplans',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @Body() data: UpdatePropertyInventoryDto, @UploadedFile() file?: Express.Multer.File) {
    if (file) {
      data.floorPlan = `/uploads/floorplans/${file.filename}`;
    }
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
