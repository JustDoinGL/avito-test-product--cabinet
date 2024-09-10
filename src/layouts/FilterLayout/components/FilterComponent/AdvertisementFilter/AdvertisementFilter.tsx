import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import CustomTextField from 'ui/CustomTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterForm, filterSchema } from './AdvertisementFilter.type';
import useDebounce from 'hooks/useDebounce';
import { Filters, TFiltersAdvertisements } from 'store/useFilterStore';

type AdvertisementFilterProps = {
  setFilters: (filters: Partial<Filters<TFiltersAdvertisements>>) => void;
};

const AdvertisementFilter: React.FC<AdvertisementFilterProps> = ({ setFilters }) => {
  const isFirstRender = useRef(true);
  const {
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<FilterForm>({
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

    if (isValid && Object.keys(errors).length === 0) {
      setFilters({
        likes: debouncedLikes,
        views: debouncedViews,
        price: debouncedPrice,
        limit: debouncedLimit || 10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLikes, debouncedLimit, debouncedPrice, debouncedViews, setFilters]);

  const handleResetFilters = () => {
    setFilters({ likes: undefined, views: undefined, price: undefined, limit: 10 });
  };

  return (
    <>
      <Box component='form' sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <CustomTextField label='Количество страниц' name='limit' control={control} type='number' />
        <CustomTextField label='Лайки' name='likes' control={control} type='number' />
        <CustomTextField label='Просмотры' name='views' control={control} type='number' />
        <CustomTextField label='Цена' name='price' control={control} type='number' />
      </Box>
      <Button onClick={handleResetFilters}>Сбросить фильтр</Button>
    </>
  );
};

export default AdvertisementFilter;
