export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  created_on: string;
  password: string;
  created_by: string;
  role: Role;
}

export type Role = 'member' | 'project_lead' | 'manager' | 'admin';
