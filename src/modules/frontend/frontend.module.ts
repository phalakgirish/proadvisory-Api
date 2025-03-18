import { Module } from '@nestjs/common';
import { FrontendService } from './frontend.service';
import { FrontendController } from './frontend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property } from '../property/property.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Property',schema:Property}]),
  ],
  providers: [FrontendService],
  controllers: [FrontendController]
})
export class FrontendModule {}
