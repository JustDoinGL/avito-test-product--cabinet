import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Box, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAdvertisement } from 'types/Advertisement';
import CustomTextField from 'ui/CustomTextField';
import { LoadingButton } from '@mui/lab';

const advertisementSchema = z.object({
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

  createdAt: z.string().optional(),
  imageUrl: z.string().url('Некорректный URL изображения').optional(),
});

type AdvertisementFormValues = z.infer<typeof advertisementSchema>;

interface AdvertisementFormProps {
  defaultValues?: TAdvertisement;
  closeModal: () => void;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ defaultValues, closeModal }) => {
  const { control, handleSubmit, formState } = useForm<AdvertisementFormValues>({
    resolver: zodResolver(advertisementSchema),
    mode: 'onChange',
  });

  const { isDirty, isValid, isSubmitting } = formState;

  const onSubmit: SubmitHandler<AdvertisementFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
      console.log(data);

      closeModal();
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '90%', margin: '0 auto' }}>
      <Typography variant='h4' gutterBottom align='center'>
        {defaultValues?.id ? 'Редактирование объявления' : 'Создание объявления'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CustomTextField control={control} label='Название продукта' name='name' placeholder='Наименование' />

        <CustomTextField control={control} label='Описание' name='description' placeholder='Description' />

        <CustomTextField control={control} label='Введите цену' name='price' placeholder='Цена' type='number' />

        <CustomTextField control={control} label='Введите url картинки' name='imageUrl' placeholder='URL' />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={isSubmitting}
          disabled={!isDirty || !isValid}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            padding: '10px 20px',
          }}
        >
          {defaultValues?.id ? 'Сохранить изменения' : 'Создать'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AdvertisementForm;
