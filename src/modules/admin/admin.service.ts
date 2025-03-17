import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './admin.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    console.log("Attempting to validate admin:", username);
    const admin = await this.adminModel.findOne({ username });
    if (!admin) {
        console.log("Admin not found");
        throw new UnauthorizedException('Invalid credentials');
    }
    console.log("Admin found in database:", admin);
    console.log("Password from request: ", password);
    console.log("Hashed password from database: ", admin.password);
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log("Password compare result: ", isPasswordValid);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const { password: hashedPassword, ...result } = admin.toObject();
    return result;
}

  async login(admin: Admin) {
    const payload = { username: admin.username, sub: admin._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAdmin() {
    const existingAdmin = await this.adminModel.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    const hashedPassword = await bcrypt.hash('adminPassword', 10);
    const admin = new this.adminModel({
      username: 'admin@gmail.com',
      password: hashedPassword,
    });
    await admin.save();
    console.log('Admin user created');
  }
}