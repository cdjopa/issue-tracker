import { z } from 'zod';

const email = z.string().email({ message: 'Invalid email' });
const password = z
  .string()
  .min(6, { message: 'Password cannot be shorter than 6 characters' })
  .max(32, { message: 'Password cannot be longer than 32 characters' });

export const LoginSchema = z.object({
  email: email,
  password: password,
});

export const RegisterSchema = z
  .object({
    email: email,
    password: password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
