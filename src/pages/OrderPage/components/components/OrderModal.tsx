import { Box } from '@mui/material';
import CustomModal from 'ui/CustomModal';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import { TOrder } from 'types/Order';

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: TOrder;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, order }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: '85%',
          gap: '10px',
          overflow: 'auto',
          marginTop: '10px',
        }}
      >
        {order.items.map((card) => (
          <AdvertisementCard key={card.id} content={card} count={card.count} />
        ))}
      </Box>
    </CustomModal>
  );
};

export default OrderModal;
