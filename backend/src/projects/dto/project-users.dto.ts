import { IsArray, IsUUID } from 'class-validator';

export class UpdateProjectUsersDto {
  @IsUUID(4, { each: true })
  @IsArray()
  users: string[];
}
