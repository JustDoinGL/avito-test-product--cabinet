import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import CustomTextField from 'ui/CustomTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import useDebounce from 'hooks/useDebounce';
import { Filters, TFiltersOrder } from 'store/useFilterStore';
import { OrderFilterForm, orderFilterSchema } from './OrderFilter.types';

type OrderFilterProps = {
  setFilters: (filters: Partial<Filters<TFiltersOrder>>) => void;
};

const OrderFilter: React.FC<OrderFilterProps> = ({ setFilters }) => {
  const isFirstRender = useRef(true);
  const {
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<OrderFilterForm>({
    resolver: zodResolver(orderFilterSchema),
    mode: 'onChange',
    defaultValues: {
      status: undefined,
      total: undefined,
      limit: 10,
    },
  });

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
        total: debouncedTotal,
        limit: debouncedLimit || 10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedStatus, debouncedLimit, debouncedTotal, setFilters]);

  const handleResetFilters = () => {
    setFilters({ status: undefined, total: undefined, limit: 10 });
  };

  return (
    <>
      <Box component='form' sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <CustomTextField label='Количество записей' name='limit' control={control} type='number' />
        <CustomTextField label='Статус' name='status' control={control} type='number' />
        <CustomTextField label='Сумма заказа' name='total' control={control} type='number' />
      </Box>
      <Button onClick={handleResetFilters}>Сбросить фильтр</Button>
    </>
  );
};

export default OrderFilter;
