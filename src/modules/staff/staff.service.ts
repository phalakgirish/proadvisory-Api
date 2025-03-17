import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from './staff.schema';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff.name) private staffModel: Model<Staff>) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const staff = new this.staffModel(createStaffDto);
    return await staff.save();
  }

  async findAll(): Promise<Staff[]> {
    return await this.staffModel.find().exec();
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffModel.findById(id).exec();
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.staffModel.findByIdAndUpdate(id, updateStaffDto, { new: true }).exec();
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async remove(id: string): Promise<{ message: string }> {
    const staff = await this.staffModel.findByIdAndDelete(id).exec();
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return { message: 'Staff deleted successfully' };
  }
}
