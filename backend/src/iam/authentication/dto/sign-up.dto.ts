import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  readonly password: string;
}

class User {
  @IsNumber()
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;
}

export class SignUpResponseDto {
  @ValidateNested()
  readonly user: User;

  @IsString()
  readonly accessKey: string;
}
