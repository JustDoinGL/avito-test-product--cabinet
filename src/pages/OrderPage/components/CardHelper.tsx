import { CardContent, Typography, Divider, useMediaQuery, Button, Card } from '@mui/material';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import { OrderDetails, OrderModal } from './components';
import MenuButton from 'components/MenuComponent/MenuButton';
import { sizes } from 'utils/styles';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useModalStore from 'store/useModalStore';
import useApi from 'hooks/useApi';
import { TOrder } from 'types/Order';
import { useOrderFilterStore } from 'store/useFilterStore';
import { TUpdateOder, updateOrder } from 'api/orders/ordersQuery';
import useIdStore from 'store/useIdStore';

type CardHelperProps = {
  order: TOrder;
};

const CardHelper: React.FC<CardHelperProps> = ({ order }) => {
  const isLaptop = useMediaQuery(`(min-width:${sizes.laptop})`);
  const { setId, update } = useOrderFilterStore();
  const { id } = useIdStore();
  const { setOpen } = useModalStore();
  const { execute } = useApi<TUpdateOder, TOrder>();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isWatchedBefore, setIsWatchedBefore] = useState(false);

  useEffect(() => {
    if (order.items.some((item) => item.id === id)) {
      setIsWatchedBefore(true);
    } else {
      setIsWatchedBefore(false);
    }
  }, [order.items, id]);

  const handleOpenModal = (orderId: string) => {
    setOpenModal(orderId);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const menuItems = [
    {
      action: (handleClose: () => void) => {
        setId(order.id);
        setOpen(true, 'order');
        handleClose();
      },
      label: 'Редактировать',
    },
    {
      action: async (handleClose: () => void) => {
        const orderUpdate: TUpdateOder = {
          id: order.id,
          finishedAt: new Date().toISOString(),
        };

        const success = await execute(updateOrder, orderUpdate, false);
        if (success) {
          toast('Объявление было завершено');
          handleClose();
          update(order.id);
        } else {
          toast('Ошибка при удалении объявления.');
        }
      },
      label: 'Завершить',
    },
  ];

  return (
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
        border: isWatchedBefore ? '2px solid #d32f2f' : 'none',
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
        <OrderDetails order={order} />

        {isWatchedBefore && (
          <Typography variant='body1' color='info' sx={{ marginBottom: 2, fontSize: '20px' }}>
            Тут есть товар, который вы смотрели раньше
          </Typography>
        )}

        <Divider sx={{ marginY: 2 }} />

        {isLaptop && (
          <AdvertisementCard key={order.items[0].id} content={order.items[0]} count={order.items[0].count} />
        )}

        <Typography variant='h5' align='right' sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
          Итого: {order.total} ₽
        </Typography>

        <Button variant='contained' color='primary' onClick={() => handleOpenModal(order.id)} sx={{ marginTop: 2 }}>
          {isLaptop ? 'Показать все товары' : 'Показать товары'}
        </Button>
      </CardContent>

      <MenuButton menuItems={menuItems} />

      <OrderModal open={openModal === order.id} onClose={handleCloseModal} order={order} />
    </Card>
  );
};

export default CardHelper;
