import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class GetUserResponseDto {
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
