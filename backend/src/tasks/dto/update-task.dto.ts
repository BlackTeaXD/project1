import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  statusId?: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  labelIds?: number[];

  @IsNumber()
  @IsOptional()
  assigneeId?: number;
}
