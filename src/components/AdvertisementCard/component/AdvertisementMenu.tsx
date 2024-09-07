import { Menu, MenuItem } from '@mui/material';

interface AdvertisementMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const AdvertisementMenu: React.FC<AdvertisementMenuProps> = ({ anchorEl, open, onClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onClose}>Редактировать</MenuItem>
      <MenuItem onClick={onClose}>Удалить</MenuItem>
    </Menu>
  );
};

export default AdvertisementMenu;
