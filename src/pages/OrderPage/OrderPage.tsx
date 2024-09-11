import { Typography } from '@mui/material';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomLoader from 'ui/CustomLoader';
import { colors } from 'utils/styles';
import OrderCard from './components/OrderCard';
import { useModalStore, useOrderFilterStore } from 'store/index';
import CustomModal from 'ui/CustomModal';
import { OrderFilter } from 'components/Filters';

const OrderPage = () => {
  const { content, loadMoreItems, hasMore, loading, fetchItems, resetStore } = useOrderFilterStore();
  const { isOpen, reset, currentModal } = useModalStore();

  useEffect(() => {
    fetchItems({ start: 0, limit: 10 });

    return () => {
      resetStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    reset();
    // setId(null);
  };

  return (
    <>
      <InfiniteScroll
        style={{ overflowY: 'scroll' }}
        height={'85vh'}
        dataLength={content.length}
        next={loadMoreItems}
        hasMore={hasMore}
        loader={loading ? <CustomLoader /> : null}
        endMessage={
          <Typography color={colors.primary} textAlign='center' mb='20px'>
            Больше нет данных
          </Typography>
        }
      >
        <OrderCard orders={content} />
      </InfiniteScroll>

      <CustomModal open={isOpen && currentModal === 'orderFilters'} onClose={handleCloseModal}>
        <OrderFilter />
      </CustomModal>

      {/* <CustomModal open={isOpen && currentModal === 'order'} onClose={handleCloseModal}>
        <AdvertisementForm closeModal={handleCloseModal} id={id ? id : undefined} isNavigate={false} />
      </CustomModal> */}
    </>
  );
};

export default OrderPage;
