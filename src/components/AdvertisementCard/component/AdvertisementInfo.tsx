import { CardContent, CardMedia, Typography } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import EllipsisText from 'ui/EllipsisText';
import { formatDate } from 'utils/helpers';

interface AdvertisementInfoProps {
  content: TAdvertisement;
}

const AdvertisementInfo: React.FC<AdvertisementInfoProps> = ({ content }) => {
  const { name, description, price, views, likes, createdAt, imageUrl } = content;

  return (
    <>
      <CardMedia
        component='img'
        height='140'
        image={imageUrl || '/notFound.jpg'}
        alt={imageUrl ? name : 'Not Found Img'}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <EllipsisText sx={{ marginBottom: 2, textAlign: 'center', fontSize: '1rem', fontWeight: '700' }} text={name} />

        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='h6' color='info' sx={{ marginTop: '10px' }}>
          {price} ₽
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Просмотров: {views} | Лайков: {likes}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Дата добавления: {formatDate(createdAt)}
        </Typography>
      </CardContent>
    </>
  );
};

export default AdvertisementInfo;
