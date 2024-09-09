import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAdvertisement, TAdvertisementUpdate } from 'types/Advertisement';
import CustomTextField from 'ui/CustomTextField';
import { LoadingButton } from '@mui/lab';
import useApi from 'hooks/useApi';
import {
  createAdvertisement,
  fetchAdvertisementById,
  updateAdvertisement,
} from 'api/advertisements/advertisementsQuery';
import { generateUniqueId } from 'utils/helpers';
import { AdvertisementFormValues, advertisementSchema } from './advertisementSchema';
import { colors } from 'utils/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import useGlobalStore from 'store/useStore';
import { useEffect } from 'react';
import { useAdvertisementStore } from 'store/useFilterStore';

interface AdvertisementFormProps {
  closeModal: () => void;
  isNavigate?: boolean;
  id?: string;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ closeModal, isNavigate, id }) => {
  const update = useAdvertisementStore((store) => store.update);
  const { execute: fetchAdvertisement } = useApi<string, TAdvertisement>();
  const { execute: saveAdvertisement } = useApi<TAdvertisement, TAdvertisementUpdate | TAdvertisement>();
  const setAdvertisementData = useGlobalStore((store) => store.setAdvertisementData);
  const { control, handleSubmit, formState, setError, reset } = useForm<AdvertisementFormValues>({
    resolver: zodResolver(advertisementSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      imageUrl: '',
      name: '',
      price: 0,
    },
  });
  const { isDirty, isValid, isSubmitting, errors } = formState;
  const navigate = useNavigate();

  const fetchData = async (id: string) => {
    const advertisement = await fetchAdvertisement(fetchAdvertisementById, id);
    if (advertisement) {
      const formValues: AdvertisementFormValues = {
        description: advertisement.description,
        imageUrl: advertisement.imageUrl,
        name: advertisement.name,
        price: advertisement.price,
      };
      reset(formValues);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit: SubmitHandler<AdvertisementFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)).then(async () => {
      const advertisementId = id || generateUniqueId();
      const advertisement: TAdvertisement = {
        id: advertisementId,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        ...data,
      };

      const success = id
        ? await saveAdvertisement(updateAdvertisement, advertisement)
        : await saveAdvertisement(createAdvertisement, advertisement);

      if (!success) {
        setError('root', { type: 'manual', message: `Произошла ошибка при выполнении запроса` });
      } else {
        toast('Изменения внесены');
        update(id ? id : advertisementId);
        closeModal();

        if (isNavigate) navigate(RoutePaths.Advertisement(advertisementId));

        setAdvertisementData(advertisement);
      }
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '90%', margin: '0 auto' }}>
      <Typography variant='h4' gutterBottom align='center'>
        {id ? 'Редактирование объявления' : 'Создание объявления'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CustomTextField control={control} label='Название продукта' name='name' placeholder='Наименование' />

        <CustomTextField control={control} label='Описание' name='description' placeholder='Description' multiline />

        <CustomTextField control={control} label='Введите цену' name='price' placeholder='Цена' type='number' />

        <CustomTextField control={control} label='Введите url картинки' name='imageUrl' placeholder='URL' />
      </Box>

      {errors.root?.message && (
        <Typography sx={{ color: colors.error, textAlign: 'center' }}>{errors.root.message}</Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={isSubmitting}
          disabled={!isDirty || !isValid}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            padding: '10px 20px',
          }}
        >
          {id ? 'Сохранить изменения' : 'Создать'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AdvertisementForm;
