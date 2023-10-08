import { Type } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsOptional, IsPositive } from 'class-validator';

export class GetTasksQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  assignee: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  status: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  labels: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  selfAuthored: boolean;
}
