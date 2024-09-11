import { Box, AppBar, Toolbar, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation';
import { sizes } from 'utils/styles';
import useModalStore from 'store/useModalStore';
import { useLocation } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';

const Header: React.FC = () => {
  const isTablet = useMediaQuery(`(max-width:${sizes.tablet})`);
  const location = useLocation();
  const { setOpen } = useModalStore();

  const handleOpenModal = () => {
    const modalName = location.pathname === RoutePaths.AllAdvertisements ? 'advertisementFilters' : 'orderFilters';
    setOpen(true, modalName);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: isTablet ? 'space-between' : 'center' }}>
          <Navigation />

          {isTablet && (
            <IconButton
              size='large'
              aria-label='sort form'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenModal}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
