import { Controller, Get, Post, Body, Delete, Param, Put, NotFoundException } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './schemas/city.schema';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    getAll(): Promise<City[]> {
        return this.cityService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<City> {
        const city = await this.cityService.findById(id);
        if (!city) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }
        return city;
    }


    @Post()
    create(@Body() cityData: Partial<City>): Promise<City> {
        return this.cityService.create(cityData);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() cityData: Partial<City>
    ): Promise<City> {
        const updatedCity = await this.cityService.update(id, cityData);
        if (!updatedCity) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }
        return updatedCity;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        const deletedCity = await this.cityService.delete(id);
        if (!deletedCity) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }
        return { message: `City with ID ${id} deleted successfully` };
    }

}
