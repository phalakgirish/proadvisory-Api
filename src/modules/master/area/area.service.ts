import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Area } from './area.schema';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private readonly areaModel: Model<Area>) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const newArea = new this.areaModel(createAreaDto);
    return await newArea.save();
  }

  async findAll(): Promise<Area[]> {
    return await this.areaModel.find().populate('cname'); // Populate city details
  }

  async findOne(id: string): Promise<Area> {
    const area = await this.areaModel.findById(id).populate('cname');
    if (!area) throw new NotFoundException(`Area with ID ${id} not found`);
    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const updatedArea = await this.areaModel.findByIdAndUpdate(id, updateAreaDto, { new: true });
    if (!updatedArea) throw new NotFoundException(`Area with ID ${id} not found`);
    return updatedArea;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.areaModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Area with ID ${id} not found`);
    return { message: 'Area deleted successfully' };
  }
}
