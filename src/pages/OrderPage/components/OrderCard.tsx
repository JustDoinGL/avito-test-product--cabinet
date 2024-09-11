
import { TOrder } from 'types/Order';
import { Box } from '@mui/material';
import CardHelper from './CardHelper';

interface OrderCardProps {
  orders: TOrder[];
}

const OrderCard: React.FC<OrderCardProps> = ({ orders }) => {
  

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
        <CardHelper order={order} key={order.id} />
      ))}
    </Box>
  );
};

export default OrderCard;
