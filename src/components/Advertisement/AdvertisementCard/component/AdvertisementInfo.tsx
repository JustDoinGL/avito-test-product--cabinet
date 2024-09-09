import { CardContent, CardMedia, Typography } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import CustomDescription from 'ui/CustomDescription';
import EllipsisText from 'ui/EllipsisText';
import { formatDate, formatNumber } from 'utils/helpers';

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

        {description ? (
          <CustomDescription description={description} maxRows={3} />
        ) : (
          <Typography variant='body2' color='text.secondary'>
            Описание отсутствует
          </Typography>
        )}

        <Typography variant='h6' color='info' sx={{ marginTop: '10px' }}>
          {price} ₽
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Просмотров: {formatNumber(views)} | Лайков: {formatNumber(likes)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Дата добавления: {formatDate(createdAt)}
        </Typography>
      </CardContent>
    </>
  );
};

export default AdvertisementInfo;
