import { Box } from '@mui/material';
import SearchComponent from 'components/SearchComponent/SearchComponent';
import { Outlet, useLocation } from 'react-router-dom';

type FilterLayoutProps = {
  filterComponent: React.ReactNode;
};

const FilterLayout: React.FC<FilterLayoutProps> = ({ filterComponent }) => {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex', p: '0', flexDirection: 'column' }}>
      <SearchComponent isButton={location.pathname === '/'} />

      {filterComponent}
      <Outlet />
    </Box>
  );
};

export default FilterLayout;
