import { API_URL } from '@/constants';
import { LoginSchema } from './schema';
import { z } from 'zod';
import axios from 'axios';
type UserSession = any;

export default class AuthController {
  constructor() {}

  public async login(
    credentials: z.infer<typeof LoginSchema>
  ): Promise<{ error: string } | UserSession> {
    const validate = await LoginSchema.safeParseAsync(credentials);
    if (!validate.success) {
      return { error: 'Invalid Credentials' };
      // return some error
    }
    await axios
      .post(API_URL + '/auth/login', credentials)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
    return { user: 'data' };

    // try send login request

    // if login error, return error

    // return login data
  }
}
