import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required').min(3, 'Email or username must be at least 3 characters'),
  password: z.string().min(1, 'Password is required').min(3, 'Password must be at least 3 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registrationSchema = z
  .object({
    username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
