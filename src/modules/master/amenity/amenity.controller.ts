import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Header,
  NotFoundException,
} from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { Amenity } from './amenity.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express'; // Added Express import
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService, 
    private readonly cloudinaryService:CloudinaryService
  ) { }

  @Get()
  async findAll(): Promise<Amenity[]> {
    return this.amenityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Amenity> {
    const amenity = await this.amenityService.findOne(id);
    if (!amenity) {
      throw new NotFoundException('Amenity not found');
    }
    return amenity;
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(@Body() amenity: Amenity, @UploadedFile() file: Express.Multer.File): Promise<Amenity> {
    // if (file) {
    //   amenity.imageUrl = `/uploads/${file.filename}`;
    // }
    if(file != undefined)
    {
      console.log(file);
      const result_imageURl = await this.cloudinaryService.uploadImage(file,'uploads');
      console.log(result_imageURl);
      amenity.imageUrl = result_imageURl.secure_url;

    }
    return this.amenityService.create(amenity);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('uploadFile'))
  async update(
    @Param('id') id: string,
    @Body() amenity: Amenity,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Amenity> {
    if(file != undefined)
      {
        const result_imageURl = await this.cloudinaryService.uploadImage(file,'uploads');
        amenity.imageUrl = result_imageURl.secure_url;
  
      }
    const updatedAmenity = await this.amenityService.update(id, amenity); // Removed the file argument here.
    if (!updatedAmenity) {
      throw new NotFoundException('Amenity not found');
    }
    return updatedAmenity;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Amenity> {
    const deletedAmenity = await this.amenityService.remove(id);
    if (!deletedAmenity) {
      throw new NotFoundException('Amenity not found');
    }
    return deletedAmenity;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    return { imageUrl: `/uploads/${file.filename}` };
  }
}