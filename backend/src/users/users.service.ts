import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@gmail.com',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@gmail.com',
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      email: 'molly@books.com',
      username: 'molly',
      password: 'mollymember',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
