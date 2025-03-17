import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';

class LoginDto {
  username: string;
  password: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const admin = await this.adminService.validateAdmin(loginDto.username, loginDto.password);
    if (!admin) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.adminService.login(admin);
  }
}