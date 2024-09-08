import AdvertisementForm from 'components/Advertisement/AdvertisementForm/AdvertisementForm';
import useGlobalStore from 'store/useStore';
import CustomModal from 'ui/CustomModal';

const MainPage = () => {
  const { isOpen, setOpen } = useGlobalStore((store) => store);
  const handleCloseModal = () => setOpen(false);
  return (
    <>
      <CustomModal open={isOpen} onClose={handleCloseModal}>
        <AdvertisementForm closeModal={handleCloseModal} />
      </CustomModal>
    </>
  );
};

export default MainPage;
