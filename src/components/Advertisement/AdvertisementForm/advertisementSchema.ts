import { z } from 'zod';

export const advertisementSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(20, 'Название не должно превышать 20 символов'),
  description: z.string().max(800, 'Описание не должно превышать 800 символов').optional(),
  price: z.preprocess(
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
      .max(100000000, 'Цена не должна превышать 100000000'),
  ),
  imageUrl: z.string().url('Некорректный URL изображения').or(z.literal('')).optional(),
});

export type AdvertisementFormValues = z.infer<typeof advertisementSchema>;
