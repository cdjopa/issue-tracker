import {
  Contains,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateIssueDto {
  @IsString()
  @MaxLength(1000)
  summary: string;

  @IsString()
  @MaxLength(4000)
  @IsOptional()
  description: string;

  @IsUUID()
  related_project: string;

  @IsUUID()
  @IsOptional()
  assigned_to: string;

  @IsString()
  @Contains('low')
  @Contains('medium')
  @Contains('high')
  @Contains('urgent')
  @IsOptional()
  priority: string;

  @IsString()
  @Contains('backlog')
  @Contains('todo')
  @Contains('in_progress')
  @Contains('done')
  @Contains('cancelled')
  @IsOptional()
  issue_type: string;

  @IsString()
  @IsDateString()
  @IsOptional()
  target_resolution_date: string;

  @IsUUID()
  created_by: string;
}

// TODO:
// make identified_by_person based on user session upon successful pipe validation
