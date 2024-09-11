import { z } from 'zod';

export const filterSchema = z.object({
  likes: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(0, 'Количество лайков должно быть положительным числом').max(100000, 'Количество лайков не может превышать 100 000').optional()),
  views: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(0, 'Количество просмотров должно быть положительным числом').max(100000, 'Количество просмотров не может превышать 100 000').optional()),
  price: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return undefined;
      }
      return parsedValue;
    }
    return value;
  }, z.number().min(0, 'Цена должна быть положительным числом').max(100000000, 'Цена не может превышать 100 000 000').optional()),
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

export type FilterForm = z.infer<typeof filterSchema>;
