import { Card, CardContent, Typography, Divider, Box, useMediaQuery, Button } from '@mui/material';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import MenuButton from 'components/MenuComponent/MenuButton';
import { TOrder } from 'types/Order';
import CustomModal from 'ui/CustomModal';
import { formatDate, statusMap } from 'utils/helpers';
import { sizes } from 'utils/styles';
import { useState } from 'react';

interface OrderCardProps {
  orders: TOrder[];
}

const OrderCard: React.FC<OrderCardProps> = ({ orders }) => {
  const isLaptop = useMediaQuery(`(min-width:${sizes.laptop})`);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            maxWidth: '90%',
            minWidth: '90%',
            marginBottom: 2,
            position: 'relative',
            borderRadius: '12px',
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
            },
            padding: '10px',
          }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
                Заказ №{order.id}
              </Typography>
              <Typography variant='h6' color='text.secondary' sx={{ marginBottom: 1 }}>
                Статус: <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{statusMap[order.status]}</span>
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
            <Divider sx={{ marginY: 2 }} />

            {isLaptop && <AdvertisementCard key={order.items[0].id} content={order.items[0]} isAdvertisementMenu />}

            <Typography variant='h5' align='right' sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
              Итого: {order.total} ₽
            </Typography>

            <Button variant='contained' color='primary' onClick={() => setOpenModal(true)} sx={{ marginTop: 2 }}>
              {isLaptop ? 'Показать все товары' : 'Показать товары'}
            </Button>
          </CardContent>

          <MenuButton id={order.id} />

          <CustomModal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                maxWidth: '85%',
                gap: '10px',
                overflow: 'auto',
                marginTop: '10px',
              }}
            >
              {order.items.map((card) => (
                <AdvertisementCard key={card.id} content={card} />
              ))}
            </Box>
          </CustomModal>
        </Card>
      ))}
    </Box>
  );
};

export default OrderCard;
