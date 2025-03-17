import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertySubtype } from './property-subtype.schema';

@Injectable()
export class PropertySubtypeService {
  constructor(
    @InjectModel(PropertySubtype.name) private propertySubtypeModel: Model<PropertySubtype>,
    @InjectModel('PropertyType') private propertyTypeModel: Model<any>,
  ) {}

  async findAll(): Promise<any[]> {
    const propertySubtypes = await this.propertySubtypeModel.find().populate('propertyType').exec();
    return Promise.all(propertySubtypes.map(async (subtype) => {
      const propertyType = await this.propertyTypeModel.findById(subtype.propertyType);
      return {
        ...subtype.toObject(),
        propertyTypeName: propertyType ? propertyType.ptname : null,
      };
    }));
  }

  async findOne(id: string): Promise<any | null> {
    const propertySubtype = await this.propertySubtypeModel.findById(id).populate('propertyType').exec();
    if (!propertySubtype) {
      return null;
    }
    const propertyType = await this.propertyTypeModel.findById(propertySubtype.propertyType);
    return {
      ...propertySubtype.toObject(),
      propertyTypeName: propertyType ? propertyType.ptname : null,
    };
  }

  async create(propertySubtypeDto: any): Promise<PropertySubtype> {
    const propertyType = await this.propertyTypeModel.findOne({ ptname: propertySubtypeDto.propertyType }).exec();

    if (!propertyType) {
      throw new NotFoundException(`Property type "${propertySubtypeDto.propertyType}" not found.`);
    }

    const createdPropertySubtype = new this.propertySubtypeModel({
      propertyType: propertyType._id,
      pstname: propertySubtypeDto.pstname,
      status: propertySubtypeDto.status,
    });

    return createdPropertySubtype.save();
  }

  async update(id: string, propertySubtype: PropertySubtype): Promise<PropertySubtype | null> {
    return this.propertySubtypeModel.findByIdAndUpdate(id, propertySubtype, { new: true }).populate('propertyType').exec();
  }

  async remove(id: string): Promise<PropertySubtype | null> {
    return this.propertySubtypeModel.findByIdAndDelete(id).exec();
  }

 
}