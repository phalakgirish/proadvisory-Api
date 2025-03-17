
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertyType } from './property-type.schema';


@Injectable()
export class PropertyTypeService {
  constructor(@InjectModel(PropertyType.name) private propertyTypeModel: Model<PropertyType>) {}

  async findAll(): Promise<PropertyType[]> {
    return this.propertyTypeModel.find().exec();
  }

  async findOne(id: string): Promise<PropertyType | null> {
    return this.propertyTypeModel.findById(id).exec();
  }

  async create(propertyType: PropertyType): Promise<PropertyType> {
    const createdPropertyType = new this.propertyTypeModel(propertyType);
    return createdPropertyType.save();
  }

  async update(id: string, propertyType: PropertyType): Promise<PropertyType | null> {
    return this.propertyTypeModel.findByIdAndUpdate(id, propertyType, { new: true }).exec();
  }

  async remove(id: string): Promise<PropertyType | null> {
    return this.propertyTypeModel.findByIdAndDelete(id).exec();
  }

  
}