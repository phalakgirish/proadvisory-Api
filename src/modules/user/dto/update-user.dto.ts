import { IsString, IsEmail, IsPhoneNumber, MinLength, IsOptional, IsIn, IsMongoId } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsMongoId()
  staffId?: string;

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
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Active', 'Inactive'])
  status?: string;
}
