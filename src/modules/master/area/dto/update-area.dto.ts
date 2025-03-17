import { IsString, IsOptional } from 'class-validator';

export class UpdateAreaDto {
  @IsString()
  @IsOptional()
  aname?: string;

  @IsString()
  @IsOptional()
  pincode?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
