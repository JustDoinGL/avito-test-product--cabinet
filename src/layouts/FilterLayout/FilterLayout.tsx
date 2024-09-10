import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import { sizes } from 'utils/styles';
import { useAdvertisementFilterStore, useOrderFilterStore } from 'store/useFilterStore';
import { RoutePaths } from 'utils/routes/routes';
import FilterProvider from './components/FilterComponent/FilterProvider';

const FilterLayout: React.FC = () => {
  const location = useLocation();
  const setFiltersAdvertisement = useAdvertisementFilterStore((store) => store.setFilters);
  const setFiltersOrder = useOrderFilterStore((store) => store.setFilters);

  const isMainPage = location.pathname === RoutePaths.AllAdvertisements;

  return (
    <Box
      sx={{
        display: 'flex',
        p: '1',
        flexDirection: 'column',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <SearchComponent isMainPage={isMainPage} setFilters={isMainPage ? setFiltersAdvertisement : setFiltersOrder} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginTop: '30px',
        }}
      >
        <Box sx={{ width: '50%', [`@media (max-width: ${sizes.tablet})`]: { width: '90%' } }}>
          <Outlet />
        </Box>

        <Box
          sx={{
            maxWidth: '30%',
            [`@media (max-width: ${sizes.tablet})`]: { display: 'none' },
          }}
        >
          <FilterProvider isMainPage={isMainPage} />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterLayout;
