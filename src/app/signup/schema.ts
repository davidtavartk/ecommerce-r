import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required').min(3, 'Email or username must be at least 3 characters'),
  password: z.string().min(1, 'Password is required').min(3, 'Password must be at least 3 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
