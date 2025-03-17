import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './staff.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
