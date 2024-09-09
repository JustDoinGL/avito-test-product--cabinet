import { Box } from '@mui/material';
import FilterComponent from 'components/FilterComponent/FilterComponents';
import SearchComponent from 'components/SearchComponent/SearchComponent';
import { Outlet, useLocation } from 'react-router-dom';

const FilterLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', p: '1', flexDirection: 'column' }}>
      <SearchComponent isMainPage={location.pathname === '/'} />
      <Box sx={{ display: 'flex', mt: '30px', justifyContent: 'space-around' }}>
        <Box>
          <Outlet />
        </Box>

        <Box>
          <FilterComponent />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterLayout;
