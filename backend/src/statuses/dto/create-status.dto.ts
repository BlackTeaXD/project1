import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import * as _ from 'lodash';

export class CreateStatusRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => _.capitalize(value))
  title: string;
}

export class CreateStatusResponseDto {
  id: number;
  title: string;
  createdAt: Date;
}
