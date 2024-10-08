import { Box, Button, Typography } from '@mui/material';
import { fetchAdvertisementById } from 'api/advertisements/advertisementsQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import ProductDetails from './components/ProductCard';
import useApi from 'hooks/useApi';
import { useEffect, useState } from 'react';
import { TAdvertisement } from 'types/Advertisement';
import { CustomLoader } from 'ui/index';
import useIdStore from 'store/useIdStore';

const AdvertisementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TAdvertisement | null>();
  const { execute, isLoading, error } = useApi<string, TAdvertisement>();
  const { setId } = useIdStore();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(RoutePaths.AllAdvertisements);
    }
  };

  const fetchData = async (id: string) => {
    const advertisement = await execute(fetchAdvertisementById, id);

    setData(advertisement);
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
      setId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id || error) {
    return (
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh'>
        <Typography variant='h6' color='error' textAlign='center'>
          Произошла ошибка: {'Некорректный ID или ' + error}
        </Typography>
        <Button variant='contained' color='primary' onClick={handleGoBack} sx={{ mt: 2 }}>
          Вернуться назад
        </Button>
      </Box>
    );
  }

  return (
    <Box>{data ? <ProductDetails handleGoBack={handleGoBack} product={data} /> : isLoading && <CustomLoader />}</Box>
  );
};

export default AdvertisementPage;
