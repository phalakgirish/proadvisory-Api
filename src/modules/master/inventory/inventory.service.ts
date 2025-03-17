// inventory.service.ts (NestJS)

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';


@Injectable()
export class InventoryService {
  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async findOne(id: string): Promise<Inventory | null> {
    return this.inventoryModel.findById(id).exec();
  }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory | null> {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Inventory | null> {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }

 
}