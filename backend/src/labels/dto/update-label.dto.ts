import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import * as _ from 'lodash';

export class UpdateLabelRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => _.capitalize(value))
  title: string;
}

export class UpdateLabelResponseDto {
  id: number;
  title: string;
  createdAt: Date;
}
