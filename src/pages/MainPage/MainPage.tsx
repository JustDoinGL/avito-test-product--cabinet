import AdvertisementForm from 'components/Advertisement/AdvertisementForm/AdvertisementForm';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CustomLoader, CustomModal } from 'ui/index';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import { Typography } from '@mui/material';
import { colors } from 'utils/styles';
import { useEffect } from 'react';
import { useModalStore, useAdvertisementFilterStore, useIdStore } from 'store/index';
import { AdvertisementFilter } from 'components/Filters';

const MainPage = () => {
  const { content, loadMoreItems, hasMore, loading, fetchItems, resetStore, setId, id } = useAdvertisementFilterStore();
  const { isOpen, reset, currentModal } = useModalStore((store) => store);
  const { reset: resetId } = useIdStore();

  useEffect(() => {
    fetchItems({ start: 0, limit: 10 });

    return () => {
      resetStore();
      resetId();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    reset();
    setId(null);
  };

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
          <Typography color={colors.primary} textAlign='center' marginY='20px'>
            Больше нет данных
          </Typography>
        }
      >
        {content.map((item) => (
          <AdvertisementCard content={item} key={item.id} isAdvertisementMenu />
        ))}
      </InfiniteScroll>

      <CustomModal open={isOpen && currentModal === 'advertisementFilters'} onClose={handleCloseModal}>
        <AdvertisementFilter />
      </CustomModal>

      <CustomModal open={isOpen && currentModal === 'advertisement'} onClose={handleCloseModal}>
        <AdvertisementForm closeModal={handleCloseModal} id={id ? id : undefined} isNavigate={false} />
      </CustomModal>
    </>
  );
};

export default MainPage;
