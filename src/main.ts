import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AdminService } from './modules/admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true,bodyParser:true});
  app.use(helmet())
 
  // Increase the request body size limit
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  // const adminService = app.get(AdminService); 
  //   await adminService.createAdmin();
  await app.listen(process.env.PORT ?? 3000);

  
}
bootstrap();
