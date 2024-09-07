import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

type FilterLayoutProps = {
  filterComponent: React.ReactNode;
};

const FilterLayout: React.FC<FilterLayoutProps> = ({ filterComponent }) => {
  return (
    <Box sx={{ display: 'flex', p: '0' }}>
      <Box sx={{ maxWidth: '60%', p: 2 }}>
        <Outlet />
      </Box>

      <Box sx={{ maxwidth: '30%', p: 2 }}> {filterComponent}</Box>

      {/* <Box sx={{ width: '10%' }} /> */}
    </Box>
  );
};

export default FilterLayout;
