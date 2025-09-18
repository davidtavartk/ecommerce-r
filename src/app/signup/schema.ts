import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required').min(3, 'Email must be at least 3 characters'),
  password: z.string().min(1, 'Password is required').min(3, 'Password must be at least 3 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registrationSchema = z
  .object({
    avatar: z.instanceof(File).optional(),
    username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
