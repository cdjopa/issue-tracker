import { IsUUID } from 'class-validator';

export class FindProjectsDto {
  @IsUUID()
  user_id: string;
}
