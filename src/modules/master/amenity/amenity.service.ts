import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenity } from './amenity.schema';

@Injectable()
export class AmenityService {
  constructor(@InjectModel(Amenity.name) private amenityModel: Model<Amenity>) {}

  async findAll(): Promise<Amenity[]> {
    return this.amenityModel.find().exec();
  }

  async findOne(id: string): Promise<Amenity | null> {
    return this.amenityModel.findById(id).exec();
  }

  async create(amenity: Amenity): Promise<Amenity> {
    const createdAmenity = new this.amenityModel(amenity);
    return createdAmenity.save();
  }

  async update(id: string, amenity: any): Promise<Amenity | null> {
    if(amenity.imageUrl == undefined)
      {
          const amenity_url=await this.amenityModel.findById(id)
          .exec();

          amenity = {...amenity,imageUrl:amenity_url?.imageUrl}   
      }
    return this.amenityModel.findByIdAndUpdate(id, amenity, { new: true }).exec();
  }

  async remove(id: string): Promise<Amenity | null> {
    return this.amenityModel.findByIdAndDelete(id).exec();
  }
}