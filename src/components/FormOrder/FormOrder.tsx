import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import useApi from 'hooks/useApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOrderFilterStore } from 'store/useFilterStore';
import { TOrder } from 'types/Order';
import { OrderFormValues, orderSchema } from './FormOrder.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchOrderById, TUpdateOder, updateOrder } from 'api/orders/ordersQuery';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { CustomStatusSelect, CustomTextField } from 'ui/index';
import { orderStatusOptions } from 'utils/const/orderStatusOptions';
import { colors } from 'utils/styles';

interface OrderFormProps {
  closeModal: () => void;
  id: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ id, closeModal }) => {
  const update = useOrderFilterStore((store) => store.update);
  const { execute: fetchOrder } = useApi<string, TOrder>();
  const { execute: saveOrder } = useApi<TUpdateOder, TOrder>();

  const { control, handleSubmit, formState, setError, reset } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: {
      status: undefined,
      total: undefined,
    },
  });
  const { isDirty, isValid, isSubmitting, errors } = formState;

  const fetchData = async (id: string) => {
    const order = await fetchOrder(fetchOrderById, id);
    if (order) {
      const formValues: OrderFormValues = {
        status: order.status,
        total: order.total,
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

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)).then(async () => {
      const order: TUpdateOder = {
        id: id,
        ...data,
      };

      const success = await saveOrder(updateOrder, order, false);

      if (!success) {
        setError('root', { type: 'manual', message: `Произошла ошибка при выполнении запроса` });
      } else {
        toast('Изменения внесены');
        update(id);
        closeModal();
      }
    });
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component='form'
      sx={{ maxWidth: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      <Typography variant='h4' gutterBottom align='center'>
        Редактирование заказа
      </Typography>

      <CustomStatusSelect control={control} name='status' title='Варинт заказа' statusOptions={orderStatusOptions} />

      <CustomTextField
        control={control}
        label='Стоимость продукста'
        name='total'
        placeholder='Введите сумму'
        type='number'
      />

      {errors.root?.message && (
        <Typography sx={{ color: colors.error, textAlign: 'center' }}>{errors.root.message}</Typography>
      )}

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
        Сохранить изменения
      </LoadingButton>
    </Box>
  );
};

export default OrderForm;
