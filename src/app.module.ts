import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AmenityModule } from './modules/master/amenity/amenity.module';
import { AreaModule } from './modules/master/area/area.module';
import { CityModule } from './modules/master/city/city.module';
import { InventoryModule } from './modules/master/inventory/inventory.module';
import { PropertyInventoryModule } from './modules/master/property-inventory/property-inventory.module';
import { PropertySubtypeModule } from './modules/master/property-subtype/property-subtype.module';
import { PropertyTypeModule } from './modules/master/property-type/property-type.module';
import { StaffModule } from './modules/staff/staff.module';
import { UserModule } from './modules/user/user.module';
import { PropertyModule } from './modules/property/property.module';
import { AdminModule } from './modules/admin/admin.module';
import { FrontendModule } from './modules/frontend/frontend.module';


@Module({
    imports: [ ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/pro-advizar'),
    CityModule,AmenityModule,AreaModule,InventoryModule,PropertyTypeModule,PropertySubtypeModule,PropertyInventoryModule,
    StaffModule,UserModule,PropertyModule,AdminModule,FrontendModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
