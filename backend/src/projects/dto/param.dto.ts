import { IsUUID } from 'class-validator';

export class ProjectSearchParams {
  @IsUUID()
  project_id: string;
}
