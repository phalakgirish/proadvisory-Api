import { IsString, IsEmail, IsPhoneNumber, MinLength, IsIn, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()  
  staffId: string;

  @IsString()
  Name: string;

  @IsPhoneNumber('IN')
  MobileNo: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsIn(['Active', 'Inactive'])
  status: string;
}
