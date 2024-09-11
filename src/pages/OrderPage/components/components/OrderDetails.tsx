import { Box, Typography } from '@mui/material';
import { formatDate } from 'utils/helpers';
import { TOrder } from 'types/Order';
import { orderStatusOptions } from 'utils/const/orderStatusOptions';

interface OrderDetailsProps {
  order: TOrder;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const orderStatusLabel = orderStatusOptions.find((option) => option.value === order.status)?.label;
  return (
    <Box>
      <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
        Заказ №{order.id}
      </Typography>
      <Typography variant='h6' color='text.secondary' sx={{ marginBottom: 1 }}>
        Статус: <Typography style={{ fontWeight: 'bold', color: '#4caf50' }}>{orderStatusLabel}</Typography>
      </Typography>
      <Typography variant='h6' color='text.secondary' sx={{ marginBottom: 1 }}>
        Способ доставки: <span style={{ fontWeight: 'bold' }}>{order.deliveryWay}</span>
      </Typography>
      <Typography variant='h6' color='text.secondary' sx={{ marginBottom: 1 }}>
        Дата создания: <span style={{ fontWeight: 'bold' }}>{formatDate(order.createdAt)}</span>
      </Typography>

      {order.finishedAt && (
        <Typography variant='h6' color='text.secondary' sx={{ marginBottom: 1 }}>
          Дата завершения: <span style={{ fontWeight: 'bold' }}>{formatDate(order.finishedAt)}</span>
        </Typography>
      )}
    </Box>
  );
};

export default OrderDetails;
