import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertyInventory } from './property-inventory.schema';
import { CreatePropertyDto } from './dto/create-property-inventory.dto';
import { UpdatePropertyInventoryDto } from './dto/update-property-inventory.dto';

@Injectable()
export class PropertyInventoryService {
  constructor(
    @InjectModel(PropertyInventory.name) private readonly model: Model<PropertyInventory>,
  ) {}

  async create(data: CreatePropertyDto): Promise<PropertyInventory> {
    return await new this.model(data).save();
  }

  async findAll(): Promise<PropertyInventory[]> {
    return await this.model
      .find()
      .populate('property')
      .populate('inventory')
      .populate('area')
      .exec();
  }

  async findOne(id: string): Promise<PropertyInventory | null> {
    return await this.model
      .findById(id)
      .populate('property')
      .populate('inventory')
      .populate('area')
      .exec();
  }

  async update(id: string, data: UpdatePropertyInventoryDto): Promise<PropertyInventory | null> {
    return await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate('property')
      .populate('inventory')
      .populate('area')
      .exec();
  }

  async delete(id: string): Promise<PropertyInventory | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
