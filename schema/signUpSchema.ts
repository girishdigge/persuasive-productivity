import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  username: z.string().min(2, 'min length 2 characters.'),
});

export type signUpSchema = z.infer<typeof signUpSchema>;
