import { z } from 'zod';

export const orderSchema = z.object({
  status: z.number(),
  total: z.number().nonnegative({ message: "Сумма должна быть неотрицательным числом" }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;