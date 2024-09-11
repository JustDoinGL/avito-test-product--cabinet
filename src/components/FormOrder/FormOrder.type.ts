import { z } from 'zod';

export const orderSchema = z.object({
  status: z.number().int().nonnegative(),
  total: z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          return undefined;
        }
        return parsedValue;
      }
      return value;
    },
    z
      .number({
        required_error: 'Введите число',
      })
      .min(0, 'Цена должна быть положительной')
      .max(100000000, 'Цена не должна превышать 100 000 000'),
  ),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
