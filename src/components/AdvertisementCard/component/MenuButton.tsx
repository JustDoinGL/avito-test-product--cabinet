import React from 'react';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from 'utils/styles';

interface MenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      size='large'
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        color: colors.textSecondary,
        '&:hover': { color: colors.primary },
      }}
      onClick={onClick}
    >
      <SettingsIcon />
    </IconButton>
  );
};

export default MenuButton;
