import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent/FilterComponents';
import { sizes } from 'utils/styles';

const FilterLayout: React.FC = () => {
  const location = useLocation();

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
      <SearchComponent isMainPage={location.pathname === '/'} />
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
          <FilterComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterLayout;
