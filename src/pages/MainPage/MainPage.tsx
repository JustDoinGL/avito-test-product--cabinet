import AdvertisementForm from 'components/Advertisement/AdvertisementForm/AdvertisementForm';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGlobalStore from 'store/useStore';
import { useAdvertisementStore } from '../../store/useFilterStore';
import { CustomLoader, CustomModal } from 'ui/index';
import AdvertisementCard from 'components/Advertisement/AdvertisementCard/AdvertisementCard';
import { Typography } from '@mui/material';
import { colors } from 'utils/styles';

const MainPage = () => {
  const { advertisements, loadMoreAdvertisements, hasMore, loading } = useAdvertisementStore();
  const { isOpen, setOpen, id, setId, setAdvertisementData } = useGlobalStore((store) => store);

  const handleCloseModal = () => {
    setAdvertisementData(null);
    setOpen(false);
    setId(null);
  };

  return (
    <>
      <InfiniteScroll
        style={{ overflowY: 'scroll' }}
        height={'80vh'}
        dataLength={advertisements.length}
        next={loadMoreAdvertisements}
        hasMore={hasMore}
        loader={loading ? <CustomLoader /> : null}
        endMessage={
          <Typography color={colors.primary} textAlign='center' mb='20px'>
            Больше нет данных
          </Typography>
        }
      >
        {advertisements.map((item) => (
          <AdvertisementCard content={item} key={item.id} isAdvertisementMenu />
        ))}
      </InfiniteScroll>

      <CustomModal open={isOpen} onClose={handleCloseModal}>
        <AdvertisementForm closeModal={handleCloseModal} id={id ? id : undefined} isNavigate={false} />
      </CustomModal>
    </>
  );
};

export default MainPage;
