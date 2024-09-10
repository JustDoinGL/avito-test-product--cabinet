import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import { colors } from 'utils/styles';

const Navigation: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <NavLink
        to={RoutePaths.AllAdvertisements}
        style={({ isActive }) => ({
          color: isActive ? colors.activeLinkColor : 'inherit',
        })}
      >
        <Button color='inherit'>Объявления</Button>
      </NavLink>
      <NavLink
        to={RoutePaths.Orders}
        style={({ isActive }) => ({
          color: isActive ? colors.activeLinkColor : 'inherit',
        })}
      >
        <Button color='inherit'>Заказы</Button>
      </NavLink>
    </Box>
  );
};

export default Navigation;
