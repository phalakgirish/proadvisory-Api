import { IsString, IsEmail, IsPhoneNumber, IsDateString, IsOptional } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  Name?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  MobileNo?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  userType?: string;

  @IsOptional()
  @IsDateString()
  joiningDate?: string;
}
