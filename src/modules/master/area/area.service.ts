import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Area } from './area.schema';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private readonly areaModel: Model<Area>) {}

  // Create a new area
  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const newArea = new this.areaModel(createAreaDto);
    return await newArea.save();
  }

  // Get all areas with city details populated
  async findAll(): Promise<Area[]> {
    return await this.areaModel.find().populate('cname').lean(); // Added lean() for performance
  }

  // Get area by ID with populated city details
  async findOne(id: string): Promise<Area> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format`);
    }
    const area = await this.areaModel.findById(id).populate('cname').lean();
    if (!area) throw new NotFoundException(`Area with ID ${id} not found`);
    return area;
  }

  // Update area by ID
  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format`);
    }
    const updatedArea = await this.areaModel.findByIdAndUpdate(id, updateAreaDto, { new: true }).lean();
    if (!updatedArea) throw new NotFoundException(`Area with ID ${id} not found`);
    return updatedArea;
  }

  // Delete area by ID
  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format`);
    }
    const deleted = await this.areaModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Area with ID ${id} not found`);
    return { message: 'Area deleted successfully' };
  }
}
