import {
  Contains,
  IsDateString,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class Issue {
  @IsString()
  id: string;

  @IsString()
  @MaxLength(1000)
  summary: string;

  @IsString()
  @MaxLength(4000)
  description: string;

  @IsDateString()
  identified_date: string;

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

  @IsDateString()
  target_resolution_date: string;

  @IsDateString()
  actual_resolution_date: string;

  @IsString()
  resolution_summary: string;

  @IsDateString()
  created_on: string;

  @IsString()
  created_by: string;
}

// export class Issue {
//   id: string;
//   summary: string;
//   description: string;
//   identified_date: string;
//   related_project: string;
//   assigned_to: string;
//   priority: Priority;
//   issue_type: Issue_Type;
//   target_resolution_date: string;
//   resolution_summary: string;
//   created_on: string;
//   created_by: string;
// }

// export type Priority = undefined | 'low' | 'medium' | 'high' | 'urgent';
// export type Issue_Type =
//   | 'backlog'
//   | 'todo'
//   | 'in_progress'
//   | 'done'
//   | 'cancelled';
