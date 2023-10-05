import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class SignInRequestDto {
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

export class SignInResponseDto {
  @ValidateNested()
  readonly user: User;

  @IsString()
  readonly accessKey: string;
}
