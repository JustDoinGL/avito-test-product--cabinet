import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from 'utils/styles';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAdvertisement } from 'api/advertisements/advertisementsQuery';
import useApi from 'hooks/useApi';
import { useAdvertisementFilterStore } from 'store/useFilterStore';
import useModalStore from 'store/useModalStore';

interface MenuButtonProps {
  id: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const setOpen = useModalStore((store) => store.setOpen);
  const { update, setId } = useAdvertisementFilterStore();
  const { execute } = useApi<string, boolean>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setId(id);
    setOpen(true, 'advertisement');
    handleClose();
  };

  const handleDelete = async () => {
    const success = await execute(deleteAdvertisement, id, false);
    if (success) {
      toast('Объявление было удалено');
      handleClose();
      update(id);
    } else {
      toast('Ошибка при удалении объявление.');
    }
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
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </>
  );
};

export default MenuButton;
