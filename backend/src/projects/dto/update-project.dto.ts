import { IsDateString, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ['created_by'] as const),
) {
  @IsOptional()
  @IsDateString()
  actual_end_date: string;
}
