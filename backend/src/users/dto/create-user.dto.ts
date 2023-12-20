import { Role } from '../entities/user.entity';

export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
  created_by: string; // username of person who created resource
  role: Role;
}
