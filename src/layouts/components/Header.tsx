import { Box, AppBar, Toolbar, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation';
import { sizes } from 'utils/styles';

const Header: React.FC = () => {
  const isTablet = useMediaQuery(`(max-width:${sizes.tablet})`);

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
              // onClick={handleMenu}
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
