import { z } from 'zod';

export const orderFilterSchema = z.object({
  status: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(0, 'Статус должен быть положительным числом').max(10, 'Статус не может превышать 10').optional()),

  total: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(0, 'Сумма заказа должна быть положительным числом').max(1000000, 'Сумма заказа не может превышать 1 000 000').optional()),

  limit: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(5, 'Минимальный показ записей 5').max(30, 'Количество записей не может превышать 30')),
});

export type OrderFilterForm = z.infer<typeof orderFilterSchema>;