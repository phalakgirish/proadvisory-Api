import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

    async findAll(): Promise<City[]> {
      const cities = await this.cityModel.find().exec();
      return cities.map(city => ({
        id: city._id.toString(),  // Ensure the ID is a string
        cname: city.cname,
        status: city.status,
      }));
    }
    
  
    async findById(id: string): Promise<City | null> {
        return this.cityModel.findById(id).exec();
      }
      
    async create(cityData: Partial<City>): Promise<City> {
      const newCity = new this.cityModel(cityData);
      return newCity.save();
    }
  
    async update(id: string, cityData: Partial<City>): Promise<City | null> {
        return this.cityModel.findByIdAndUpdate(id, cityData, { new: true }).exec();
      }
  
      async delete(id: string): Promise<City | null> {
        return this.cityModel.findByIdAndDelete(id).exec();
      }
      
}
