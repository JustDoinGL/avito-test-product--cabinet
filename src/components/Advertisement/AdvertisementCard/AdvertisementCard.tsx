import React from 'react';
import { Card } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import AdvertisementInfo from './component/AdvertisementInfo';
import MenuButton from 'components/MenuComponent/MenuButton';
import { sizes } from 'utils/styles';

interface AdvertisementCardProps {
  content: TAdvertisement;
  isAdvertisementMenu?: boolean;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ content, isAdvertisementMenu }) => {
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
    </Card>
  );
};

export default AdvertisementCard;
