
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Header,
  NotFoundException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.schema';
import { Response } from 'express';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Inventory> {
    const inventory = await this.inventoryService.findOne(id);
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }
    return inventory;
  }

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventory: Inventory = {
      inventoryName: createInventoryDto.inventoryName,
      noOfBKH: createInventoryDto.noOfBKH,
      status: createInventoryDto.status,
    } as Inventory; // Type assertion

    return this.inventoryService.create(inventory);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventory: Inventory = {
      inventoryName: updateInventoryDto.inventoryName,
      noOfBKH: updateInventoryDto.noOfBKH,
      status: updateInventoryDto.status,
    } as Inventory; // Type assertion

    const updatedInventory = await this.inventoryService.update(id, inventory);
    if (!updatedInventory) {
      throw new NotFoundException('Inventory not found');
    }
    return updatedInventory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Inventory> {
    const deletedInventory = await this.inventoryService.remove(id);
    if (!deletedInventory) {
      throw new NotFoundException('Inventory not found');
    }
    return deletedInventory;
  }


}