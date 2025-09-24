import { z } from 'zod';

export const filterSchema = z
  .object({
    priceFrom: z.string(),
    priceTo: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.priceFrom.trim() && data.priceTo.trim()) {
      const from = parseInt(data.priceFrom);
      const to = parseInt(data.priceTo);

      if (!(from > 0 && to > 0 && from < to)) {
        const message = "Price 'from' must be less than 'to' and both must be positive";

        ctx.addIssue({
          code: 'custom',
          message,
          path: ['priceFrom'],
        });

        ctx.addIssue({
          code: 'custom',
          message: '__NO_DISPLAY__',
          path: ['priceTo'],
        });
      }
    }

    if ((data.priceFrom.trim() && !data.priceTo.trim()) || (!data.priceFrom.trim() && data.priceTo.trim())) {
      const message = 'Both price fields must be filled or both must be empty';

      ctx.addIssue({
        code: 'custom',
        message,
        path: ['priceFrom'],
      });

      ctx.addIssue({
        code: 'custom',
        message: '__NO_DISPLAY__',
        path: ['priceTo'],
      });
    }
  });

export type FilterFormData = z.infer<typeof filterSchema>;
