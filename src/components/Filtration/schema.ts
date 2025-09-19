import { z } from 'zod';

export const filterSchema = z
  .object({
    priceFrom: z.string().min(1, 'Price from is required'),
    priceTo: z.string().min(1, 'Price to is required'),
  })
  .refine(
    (data) => {
      const from = parseInt(data.priceFrom);
      const to = parseInt(data.priceTo);

      return from > 0 && to > 0 && from < to;
    },
    {
      message: "Price 'from' must be less than 'to' and both must be positive",
      path: ['priceTo'], // Show error on the 'to' field
    },
  );

export type FilterFormData = z.infer<typeof filterSchema>;
