import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '60m' }, // Token expiry time
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
