import { CardContent, Typography, Box, Chip, Divider } from '@mui/material';
import { TAdvertisement } from 'types/Advertisement';
import CustomDescription from 'ui/CustomDescription';
import EllipsisText from 'ui/EllipsisText';
import { formatDate, formatNumber } from 'utils/helpers';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CustomImage from 'ui/CustomImage';

interface AdvertisementInfoProps {
  content: TAdvertisement;
  count?: number;
}

const AdvertisementInfo: React.FC<AdvertisementInfoProps> = ({ content }) => {
  const { name, description, price, views, likes, createdAt, imageUrl } = content;

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: 2,
        padding: 2,
      }}
    >
      <CustomImage imageUrl={imageUrl} alt={name} />

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}>
          Название:
        </Typography>
        <EllipsisText
          sx={{ marginBottom: 2, textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold', color: '#1976d2' }}
          text={name}
        />

        <Divider sx={{ marginY: 2 }} />

        <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}>
          Описание:
        </Typography>
        {description ? (
          <CustomDescription description={description} maxRows={3} maxChars={description.length} />
        ) : (
          <Typography variant='body2' color='text.secondary'>
            Описание отсутствует
          </Typography>
        )}

        <Typography variant='h6' color='primary' sx={{ marginTop: '10px', fontWeight: 'bold' }}>
          {formatNumber(price)} ₽
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1, flexWrap: 'wrap', gap: '10px' }}>
          <Chip
            icon={<VisibilityIcon />}
            label={`Просмотров: ${formatNumber(views)}`}
            variant='outlined'
            color='info'
            size='small'
            sx={{ marginRight: 1, margin: '0 auto' }}
          />
          <Chip
            icon={<FavoriteIcon />}
            label={`Лайков: ${formatNumber(likes)}`}
            variant='outlined'
            color='error'
            size='small'
            sx={{ margin: '0 auto' }}
          />
        </Box>

        <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
          Дата добавления: {formatDate(createdAt)}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default AdvertisementInfo;
