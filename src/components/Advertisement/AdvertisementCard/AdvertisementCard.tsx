import React from 'react';
import { Box, Card } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import AdvertisementInfo from './component/AdvertisementInfo';
import MenuButton from 'components/MenuComponent/MenuButton';
import { sizes } from 'utils/styles';
import { useAdvertisementFilterStore } from 'store/useFilterStore';
import useModalStore from 'store/useModalStore';
import { toast } from 'react-toastify';
import useApi from 'hooks/useApi';
import { deleteAdvertisement } from 'api/advertisements/advertisementsQuery';

interface AdvertisementCardProps {
  content: TAdvertisement;
  count?: number;
  isAdvertisementMenu?: boolean;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ content, isAdvertisementMenu, count }) => {
  const { id } = content;
  const { update, setId } = useAdvertisementFilterStore();
  const { setOpen } = useModalStore();
  const { execute } = useApi<string, boolean>();

  const menuItems = [
    {
      action: (handleClose: () => void) => {
        setId(id);
        setOpen(true, 'advertisement');
        handleClose();
      },
      label: 'Редактировать',
    },
    {
      action: async (handleClose: () => void) => {
        const success = await execute(deleteAdvertisement, id, false);
        if (success) {
          toast('Объявление было удалено');
          handleClose();
          update(id);
        } else {
          toast('Ошибка при удалении объявление.');
        }
      },
      label: 'Удалить',
    },
  ];

  return (
    <Card
      sx={{
        maxWidth: '600px',
        width: '90%',
        margin: '20px auto',
        marginTop: '0',
        position: 'relative',
        boxShadow: 3,
        border: '1px solid #ccc',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
        [`@media (max-width: ${sizes.tablet})`]: { width: '95%' },
      }}
    >
      <Link to={RoutePaths.Advertisement(id)} style={{ textDecoration: 'none', color: 'inherit' }}>
        <AdvertisementInfo content={content} />
      </Link>

      {isAdvertisementMenu && <MenuButton menuItems={menuItems} />}

      {count !== undefined && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}
        >
          {`Количество заказов: ${count}`}
        </Box>
      )}
    </Card>
  );
};

export default AdvertisementCard;
