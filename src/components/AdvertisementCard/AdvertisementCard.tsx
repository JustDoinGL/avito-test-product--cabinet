import React from 'react';
import { Card } from '@mui/material';
import { Advertisement } from 'types/Advertisement';
import { Link } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import { AdvertisementInfo, AdvertisementMenu, MenuButton } from './component';

interface AdvertisementCardProps {
  content: Advertisement;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ content }) => {
  const { id } = content;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        maxWidth: '500px',
        position: 'relative',
        margin: '20px',
        boxShadow: 3,
        border: '1px solid #ccc',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
      }}
    >
      <Link to={RoutePaths.Advertisement(id)} style={{ textDecoration: 'none', color: 'inherit' }}>
        <AdvertisementInfo content={content} />
      </Link>
      <MenuButton onClick={handleClick} />
      <AdvertisementMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
    </Card>
  );
};

export default AdvertisementCard;
