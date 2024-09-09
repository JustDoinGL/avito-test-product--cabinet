import React from 'react';
import { Card, CardContent, Typography, List, ListItem, Divider, Box } from '@mui/material';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';

// Определение типов для Item и Order
interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  count: number;
}

interface Order {
  id: string;
  status: number;
  createdAt: string;
  finishedAt?: string;
  total: number;
  deliveryWay: string;
  items: Item[];
}

// Компонент для отображения отдельного товара
const OrderItem: React.FC<{ item: Item }> = ({ item }) => (
  <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box>
      <Typography variant='body1'>{item.name}</Typography>
      {item.description && (
        <Typography variant='body2' color='textSecondary'>
          {item.description}
        </Typography>
      )}
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <Typography variant='body1'>{item.count} шт.</Typography>
      <Typography variant='body1'>{item.price} ₽</Typography>
    </Box>
  </ListItem>
);

// Компонент для отображения информации о заказе
const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const statusMap: { [key: number]: string } = {
    0: 'В обработке',
    1: 'Подтвержден',
    2: 'Отправлен',
    3: 'Доставлен',
    4: 'Завершен',
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant='h6'>Заказ №{order.id}</Typography>
        <Typography variant='body2' color='textSecondary'>
          Статус: {statusMap[order.status]}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Способ доставки: {order.deliveryWay}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Дата создания: {new Date(order.createdAt).toLocaleString()}
        </Typography>
        {order.finishedAt && (
          <Typography variant='body2' color='textSecondary'>
            Дата завершения: {new Date(order.finishedAt).toLocaleString()}
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
    </Card>
  );
};

const OrdersList: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <Box>
    {orders.map((order) => (
      <OrderCard key={order.id} order={order} />
    ))}
  </Box>
);

export default OrdersList;
