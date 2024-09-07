import AdvertisementCard from 'components/AdvertisementCard/AdvertisementCard';

const AdvertisementPage = () => {
  const constent = {
    id: '1',
    name: 'Стул старинный',
    description: 'Очень красивый',
    price: 2000,
    createdAt: '2022-08-12T20:16:55.351Z',
    views: 20,
    likes: 2,
    imageUrl: '',
  };
  return (
    <div>
      <AdvertisementCard content={constent} />
    </div>
  );
};

export default AdvertisementPage;
