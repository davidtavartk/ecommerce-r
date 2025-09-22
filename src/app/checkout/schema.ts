import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  surname: z.string().min(1, 'Surname is required').min(2, 'Surname must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  address: z.string().min(1, 'Address is required').min(5, 'Address must be at least 5 characters'),
  zipCode: z.string().min(1, 'Zip code is required').min(3, 'Zip code must be at least 3 characters'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
