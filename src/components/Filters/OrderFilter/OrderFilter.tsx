import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import CustomTextField from 'ui/CustomTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import useDebounce from 'hooks/useDebounce';
import { OrderFilterForm, orderFilterSchema } from './OrderFilter.types';
import { useOrderFilterStore } from 'store/useFilterStore';

const OrderFilter: React.FC = () => {
  const isFirstRender = useRef(true);
  const { setFilters } = useOrderFilterStore();
  const { control, watch, formState } = useForm<OrderFilterForm>({
    resolver: zodResolver(orderFilterSchema),
    mode: 'onChange',
    defaultValues: {
      status: undefined,
      total: undefined,
      limit: 10,
    },
  });
  const { isValid, errors } = formState;
  const formData = watch();

  const debouncedStatus = useDebounce(formData.status);
  const debouncedTotal = useDebounce(formData.total);
  const debouncedLimit = useDebounce(formData.limit);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isValid && Object.keys(errors).length === 0) {
      setFilters({
        status: debouncedStatus,
        total_gte: debouncedTotal,
        limit: debouncedLimit || 10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStatus, debouncedLimit, debouncedTotal, setFilters]);

  const handleResetFilters = () => {
    setFilters({ status: undefined, total_gte: undefined, limit: 10 });
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
        <CustomTextField label='Количество записей' name='limit' control={control} type='number' />
        <CustomTextField label='Статус' name='status' control={control} type='number' />
        <CustomTextField label='Сумма заказа' name='total' control={control} type='number' />
      </Box>
      <Button onClick={handleResetFilters}>Сбросить фильтр</Button>
    </Box>
  );
};

export default OrderFilter;
