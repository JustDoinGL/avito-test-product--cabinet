import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from 'utils/styles';
import { useState } from 'react';

interface MenuItemProps {
  label: string;
  action: (handleClose: () => void) => void;
}

interface MenuButtonProps {
  menuItems: MenuItemProps[];
}

const MenuButton: React.FC<MenuButtonProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size='large'
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          color: colors.textSecondary,
          background: colors.primary,
          '&:hover': { color: colors.primary, background: colors.textSecondary },
        }}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => item.action(handleClose)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuButton;
