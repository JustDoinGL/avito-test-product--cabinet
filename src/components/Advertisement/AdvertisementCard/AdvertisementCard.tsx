import React from 'react';
import { Box, Card } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import AdvertisementInfo from './component/AdvertisementInfo';
import MenuButton from 'components/MenuComponent/MenuButton';
import { sizes } from 'utils/styles';

interface AdvertisementCardProps {
  content: TAdvertisement;
  count?: number;
  isAdvertisementMenu?: boolean;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ content, isAdvertisementMenu, count }) => {
  const { id } = content;

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

      {isAdvertisementMenu && <MenuButton id={id} />}

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
