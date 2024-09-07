import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

const advertisementSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  price: z.number().min(0, 'Цена должна быть положительной'),
  createdAt: z.string(),
  views: z.number().min(0),
  likes: z.number().min(0),
  imageUrl: z.string().url('Некорректный URL изображения').optional(),
});

type AdvertisementFormValues = z.infer<typeof advertisementSchema>;

const Advertisement: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const defaultValues: AdvertisementFormValues = {
    id: '1',
    name: 'Стул старинный',
    description: 'Очень красивый',
    price: 2000,
    createdAt: '2022-08-12T20:16:55.351Z',
    views: 20,
    likes: 2,
    imageUrl: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvertisementFormValues>({
    defaultValues,
    resolver: zodResolver(advertisementSchema),
  });

  const onSubmit = (data: AdvertisementFormValues) => {
    console.log('Сохраненные данные:', data);
    // Здесь можно добавить логику для сохранения данных
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: isSmallScreen ? '100%' : '600px',
        margin: 'auto',
        padding: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant='h4' gutterBottom align='center'>
        Редактирование объявления
      </Typography>
      <Box>
        <Box>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Название'
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Описание'
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Цена'
                type='number'
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='views'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Просмотры'
                type='number'
                fullWidth
                error={!!errors.views}
                helperText={errors.views?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='likes'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Лайки'
                type='number'
                fullWidth
                error={!!errors.likes}
                helperText={errors.likes?.message}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='URL изображения'
                fullWidth
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            padding: '10px 20px',
          }}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default Advertisement;

