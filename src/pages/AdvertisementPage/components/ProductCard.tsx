import { Box, Typography, Button, CardMedia } from '@mui/material';
import { colors, sizes } from 'utils/styles';
import { TAdvertisement } from 'types/Advertisement';
import { formatDate } from 'utils/helpers';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InfoItem from './InfoItem';
import useResponsiveDimensions from 'hooks/useResponsiveDimensions';
import { BackButton, EllipsisText, CustomDescription } from 'ui';

type ProductDetailsProps = {
  product: TAdvertisement;
  handleGoBack: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, handleGoBack }) => {
  const dimensions = useResponsiveDimensions('100%', 300);

  return (
    <Box
      sx={{
        maxWidth: sizes.maxWidth,
        margin: '0 auto',
        padding: 3,
        pt: 0,
      }}
    >
      <BackButton handleGoBack={handleGoBack} />

      <Box
        sx={{
          width: dimensions.width,
          height: dimensions.height,
          margin: '0 auto',
          backgroundColor: '#eaeaea',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#888',
          fontSize: 18,
          mb: 3,
          overflow: 'hidden',
        }}
      >
        {product.imageUrl ? (
          <CardMedia
            component='img'
            image={product.imageUrl}
            alt={product.name}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Typography variant='body1'>Изображение отсутствует</Typography>
        )}
      </Box>

      <EllipsisText
        sx={{ marginBottom: 2, textAlign: 'center', fontSize: '2rem', fontWeight: '700' }}
        text={product.name}
      />

      <Typography variant='h3' component='p' sx={{ mb: 2, textAlign: 'center', color: colors.success }}>
        {product.price} ₽
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          color: 'text.secondary',
          mb: 4,
          [`@media (max-width:${sizes.tablet})`]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          },
        }}
      >
        <InfoItem icon={<RemoveRedEyeIcon />} text={`Просмотры: ${product.views}`} />
        <InfoItem icon={<ThumbUpIcon />} text={`Лайки: ${product.likes}`} />
        <InfoItem icon={<AlarmOnIcon />} text={`Дата создания: ${formatDate(product.createdAt)}`} />
      </Box>

      {product.description && <CustomDescription description={product.description} />}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          [`@media (max-width:${sizes.tablet})`]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          },
        }}
      >
        <Button variant='contained' color='success'>
          Создать новый заказ
        </Button>
        <Button variant='contained' color='info'>
          Редактировать
        </Button>
        <Button variant='contained' color='error'>
          Удалить
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
