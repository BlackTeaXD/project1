import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateTaskRequestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  statusId: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  labelIds?: number[];

  @IsNumber()
  @IsOptional()
  assigneeId?: number;
}
