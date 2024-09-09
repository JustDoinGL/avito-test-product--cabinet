import { Card, CardContent, Typography, List, Divider } from '@mui/material';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import MenuButton from 'components/MenuComponent/MenuButton';
import { TOrder } from 'types/Order';
import { formatDate } from 'utils/helpers';

interface OrderCardProps {
  orders: TOrder[];
}

const OrderCard: React.FC<OrderCardProps> = ({ orders }) => {
  const statusMap: { [key: number]: string } = {
    0: 'В обработке',
    1: 'Подтвержден',
    2: 'Отправлен',
    3: 'Доставлен',
    4: 'Завершен',
  };

  return (
    <>
      {orders.map((order) => (
        <Card key={order.id} sx={{ marginBottom: 2, position: 'relative' }}>
          <CardContent>
            <Typography variant='h6'>Заказ №{order.id}</Typography>
            <Typography variant='body2' color='textSecondary'>
              Статус: {statusMap[order.status]}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Способ доставки: {order.deliveryWay}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Дата создания: {formatDate(order.createdAt)}
            </Typography>
            {order.finishedAt && (
              <Typography variant='body2' color='textSecondary'>
                Дата завершения: {formatDate(order.finishedAt)}
              </Typography>
            )}
            <Divider sx={{ marginY: 2 }} />
            <List>
              {order.items.map((item) => (
                <AdvertisementCard content={item} key={item.id} isAdvertisementMenu={false} />
              ))}
            </List>
            <Typography variant='h6' align='right'>
              Итого: {order.total} ₽
            </Typography>
          </CardContent>

          <MenuButton id={order.id} />
        </Card>
      ))}
    </>
  );
};

export default OrderCard;
