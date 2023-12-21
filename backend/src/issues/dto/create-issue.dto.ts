import {
  Contains,
  IsDateString,
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
  description: string;

  @IsUUID()
  related_project: string;

  @IsString()
  assigned_to: string;

  @IsString()
  @Contains('low')
  @Contains('medium')
  @Contains('high')
  @Contains('urgent')
  priority: string;

  @IsString()
  @Contains('backlog')
  @Contains('todo')
  @Contains('in_progress')
  @Contains('done')
  @Contains('cancelled')
  issue_type: string;

  @IsString()
  @IsDateString()
  target_resolution_date: string;

  @IsString()
  created_by: string;
}

// TODO:
// make identified_by_person based on user session upon successful pipe validation
