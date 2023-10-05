import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}

export class UpdateUserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;
}
