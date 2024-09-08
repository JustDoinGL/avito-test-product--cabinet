import { Box } from '@mui/material';
import SearchComponent from 'components/SearchComponent/SearchComponent';
import { Outlet } from 'react-router-dom';

type FilterLayoutProps = {
  filterComponent: React.ReactNode;
};

const FilterLayout: React.FC<FilterLayoutProps> = ({ filterComponent }) => {
  return (
    <Box sx={{ display: 'flex', p: '0', flexDirection: 'column' }}>
      <SearchComponent />

      {filterComponent}
      <Outlet />
    </Box>
  );
};

export default FilterLayout;
