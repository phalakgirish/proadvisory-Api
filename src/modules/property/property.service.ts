import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from './property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new this.propertyModel(createPropertyDto);
    return await property.save();
  }

  async findAll() {
    try {
      const properties = await this.propertyModel
        .find({})
        .populate('city')
        .populate('area')
        .populate('propertyType')
        .populate('propertySubtype')
        .populate('amenities')
        .populate('advisor')
        .exec();
        
      return properties;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw new Error("Failed to retrieve properties.");
    }
  }
  
  
  

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyModel
      .findById(id)
      .populate('city')
      .populate('area')
      .populate('propertyType')
      .populate('propertySubtype')
      .populate('amenities')
      .populate('advisor')
      .exec();
  
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }
  

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = await this.propertyModel
      .findByIdAndUpdate(id, updatePropertyDto, { new: true })
      .populate('city', 'cname')
      .populate('area', 'aname')
      .populate('propertyType', 'ptname')
      .populate('propertySubtype', 'pstname')
      .populate('amenities', 'amenityName')
      .populate('advisor', 'Name email MobileNo') // Fetch advisor details from User
      .exec();

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async remove(id: string): Promise<{ message: string }> {
    const property = await this.propertyModel.findByIdAndDelete(id).exec();
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return { message: 'Property deleted successfully' };
  }
}
