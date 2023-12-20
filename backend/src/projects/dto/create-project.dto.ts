import { IsDateString, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  summary: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  target_end_date: string;

  @IsString()
  created_by: string;
}
