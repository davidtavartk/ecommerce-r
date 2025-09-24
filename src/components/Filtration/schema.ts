import { z } from 'zod';

export const filterSchema = z
  .object({
    priceFrom: z.string().min(1, 'Price from is required'),
    priceTo: z.string().min(1, 'Price to is required'),
  })
  .superRefine((data, ctx) => {
  const from = parseInt(data.priceFrom);
  const to = parseInt(data.priceTo);

  if (!(from > 0 && to > 0 && from < to)) {
    const message = "Price 'from' must be less than 'to' and both must be positive";
    
    ctx.addIssue({
      code: 'custom',
      message,
      path: ['priceFrom'],
    });
    
    // Add error to priceTo (for red border only) with a special marker
    ctx.addIssue({
      code: 'custom',
      message: '__NO_DISPLAY__',
      path: ['priceTo'],
    });
  }
});

export type FilterFormData = z.infer<typeof filterSchema>;
