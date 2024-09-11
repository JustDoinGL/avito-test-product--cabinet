import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import CustomTextField from 'ui/CustomTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterForm, filterSchema } from './AdvertisementFilter.type';
import useDebounce from 'hooks/useDebounce';
import { useAdvertisementFilterStore } from 'store/useFilterStore';
import CustomStatusSelect from 'ui/CustomStatusSelect';
import { limitConst } from 'utils/const/limitConst';

const AdvertisementFilter: React.FC = () => {
  const isFirstRender = useRef(true);
  const { setFilters } = useAdvertisementFilterStore();
  const { control, watch, reset } = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    mode: 'onChange',
    defaultValues: {
      likes: undefined,
      views: undefined,
      price: undefined,
      limit: 10,
    },
  });

  const formData = watch();

  const debouncedLikes = useDebounce(formData.likes);
  const debouncedViews = useDebounce(formData.views);
  const debouncedPrice = useDebounce(formData.price);
  const debouncedLimit = useDebounce(formData.limit);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setFilters({
      likes_gte: debouncedLikes,
      views_gte: debouncedViews,
      price_gte: debouncedPrice,
      limit: formData.limit || 10,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLikes, debouncedPrice, debouncedViews, debouncedLimit]);

  const handleResetFilters = () => {
    reset();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '30px',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant='h6' textAlign='center'>
        Фильтр заказов
      </Typography>
      <Box component='form' sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <CustomStatusSelect control={control} name='limit' title='Количество карточек' statusOptions={limitConst} />
        <CustomTextField
          label='Минимальное колличество лайков'
          name='likes'
          control={control}
          type='number'
          placeholder='Введите число лайков'
        />
        <CustomTextField
          label='Минимальное колличество просмотров'
          name='views'
          control={control}
          type='number'
          placeholder='Введите число просмотров'
        />
        
        <CustomTextField
          label='Минимальная цена'
          name='price'
          control={control}
          type='number'
          placeholder='Введите цену'
        />
      </Box>
      <Button onClick={handleResetFilters}>Сбросить фильтр</Button>
    </Box>
  );
};

export default AdvertisementFilter;
