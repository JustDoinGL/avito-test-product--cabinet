import { useEffect } from 'react';
import AdvertisementForm from 'components/Advertisement/AdvertisementForm/AdvertisementForm';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGlobalStore from 'store/useStore';
import { useAdvertisementStore } from './useFilterStore';
import { CustomLoader, CustomModal } from 'ui/index';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import { Box, Typography } from '@mui/material';
import { colors } from 'utils/styles';

const MainPage = () => {
  const { advertisements, loadMoreAdvertisements, hasMore, fetchAdvertisements, loading } = useAdvertisementStore();
  const { isOpen, setOpen } = useGlobalStore((store) => store);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    fetchAdvertisements({ start: 0, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <InfiniteScroll
        height={'80vh'}
        dataLength={advertisements.length}
        next={loadMoreAdvertisements}
        hasMore={hasMore}
        loader={loading ? <CustomLoader /> : null}
        endMessage={
          <Typography color={colors.primary} textAlign='center'>
            Больше нет данных
          </Typography>
        }
      >
        {advertisements.map((item) => (
          <AdvertisementCard content={item} key={item.id} />
        ))}
      </InfiniteScroll>
      <CustomModal open={isOpen} onClose={handleCloseModal}>
        <AdvertisementForm closeModal={handleCloseModal} />
      </CustomModal>
    </Box>
  );
};

export default MainPage;
