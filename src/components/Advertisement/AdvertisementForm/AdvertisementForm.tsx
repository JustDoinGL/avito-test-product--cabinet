import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAdvertisement } from 'types/Advertisement';
import CustomTextField from 'ui/CustomTextField';
import { LoadingButton } from '@mui/lab';
import useApi from 'hooks/useApi';
import { createAdvertisement, updateAdvertisement } from 'api/advertisements/advertisementsQuery';
import { generateUniqueId } from 'utils/helpers';
import { AdvertisementFormValues, advertisementSchema } from './advertisementSchema';
import { colors } from 'utils/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'utils/routes/routes';
import useGlobalStore from 'store/useStore';

interface AdvertisementFormProps {
  values?: TAdvertisement;
  closeModal: () => void;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ values, closeModal }) => {
  const { execute } = useApi<TAdvertisement, TAdvertisement>();
  const setAdvertisementData = useGlobalStore((store) => store.setAdvertisementData);
  const { control, handleSubmit, formState, setError } = useForm<AdvertisementFormValues>({
    resolver: zodResolver(advertisementSchema),
    mode: 'onChange',
    defaultValues: {
      description: values?.description,
      imageUrl: values?.imageUrl,
      name: values?.name,
      price: values?.price,
    },
  });
  const { isDirty, isValid, isSubmitting, errors } = formState;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AdvertisementFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)).then(async () => {
      const id = values?.id ? values.id : generateUniqueId();
      const advertisement: TAdvertisement = {
        id: id,
        likes: values?.likes ? values.likes : 0,
        views: values?.views ? values.views : 0,
        createdAt: values?.createdAt ? values.createdAt : new Date().toISOString(),
        ...data,
      };

      const api = values ? updateAdvertisement : createAdvertisement;
      const success = await execute(api, advertisement);

      if (!success) {
        setError('root', { type: 'manual', message: `Произошла ошибка при выполнении запроса` });
      } else {
        toast('Изменения внесены');
        closeModal();
        navigate(RoutePaths.Advertisement(id));
        setAdvertisementData(advertisement)
      }
    });
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '90%', margin: '0 auto' }}>
      <Typography variant='h4' gutterBottom align='center'>
        {values?.id ? 'Редактирование объявления' : 'Создание объявления'}
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
          {values?.id ? 'Сохранить изменения' : 'Создать'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AdvertisementForm;
