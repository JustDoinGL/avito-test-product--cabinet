import { Typography } from '@mui/material';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomLoader from 'ui/CustomLoader';
import { colors } from 'utils/styles';
import OrderCard from './components/OrderCard';
import { useOrderFilterStore } from 'store/index';

const OrderPage = () => {
  const { content, loadMoreItems, hasMore, loading, fetchItems, resetStore } = useOrderFilterStore();

  useEffect(() => {
    fetchItems({ start: 0, limit: 10 });

    return () => {
      resetStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InfiniteScroll
        style={{ overflowY: 'scroll' }}
        height={'80vh'}
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

      {/* <CustomModal open={isOpen} onClose={handleCloseModal}></CustomModal> */}
    </>
  );
};

export default OrderPage;
