import { Box, Button, Typography } from '@mui/material';
import { fetchAdvertisementById } from 'api/advertisements/advertisementsQuery';
import useFetchID from 'hooks/useFetchID';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import ProductDetails from './components/ProductCard';

const AdvertisementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchID({
    getData: fetchAdvertisementById,
    id: id || '',
  });

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(RoutePaths.AllAdvertisements);
    }
  };

  if (!id || error) {
    return (
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh'>
        <Typography variant='h6' color='error'>
          Произошла ошибка: {error ? error : 'Некорректный ID'}
        </Typography>
        <Button variant='contained' color='primary' onClick={handleGoBack} sx={{ mt: 2 }}>
          Вернуться назад
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {isLoading && <Typography>Загрузка...</Typography>}
      {data && <ProductDetails handleGoBack={handleGoBack} product={data} />}
    </Box>
  );
};

export default AdvertisementPage;
