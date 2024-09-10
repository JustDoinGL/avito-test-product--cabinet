import { Box, Typography } from '@mui/material';
import AdvertisementFilter from './AdvertisementFilter/AdvertisementFilter';
import OrderFilter from './OrderFilter/OrderFilter';
import { useAdvertisementFilterStore, useOrderFilterStore } from 'store/useFilterStore';

type FilterProviderProps = {
  isMainPage: boolean;
};

const FilterProvider: React.FC<FilterProviderProps> = ({ isMainPage }) => {
  const setFiltersAdvertisement = useAdvertisementFilterStore((store) => store.setFilters);
  const setFiltersOrder = useOrderFilterStore((store) => store.setFilters);

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
      {isMainPage ? (
        <AdvertisementFilter setFilters={setFiltersAdvertisement} />
      ) : (
        <OrderFilter setFilters={setFiltersOrder} />
      )}
    </Box>
  );
};

export default FilterProvider;
