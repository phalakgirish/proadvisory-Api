import { IsString, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  Name: string;

  @IsPhoneNumber('IN')
  MobileNo: string;

  @IsEmail()
  email: string;

  @IsString()
  userType: string;

  @IsDateString()
  joiningDate: string; 
}
