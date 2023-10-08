import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import * as _ from 'lodash';

export class UpdateStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => _.capitalize(value))
  title: string;
}

export class UpdateStatusResponseDto {
  id: number;
  title: string;
  createdAt: Date;
}
