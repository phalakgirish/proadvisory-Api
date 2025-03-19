import { Controller, Get, Param, Query } from '@nestjs/common';
import { FrontendService } from './frontend.service';

@Controller('frontend')
export class FrontendController {
    constructor(private frontendService: FrontendService) {

    }

    @Get()
    async getPropertyDetails(
        @Query('searchObject')
        searchObject:any
    ):Promise<any>{
        return this.frontendService.getPropertyDetails(searchObject);
    }


    @Get(':id')
    async getPropertyDetailsById(
        @Param('id')
        id:any
    ):Promise<any>{
        return this.frontendService.getPropertyDetailsById(id);
    }
}
