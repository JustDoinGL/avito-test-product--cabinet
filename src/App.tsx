import { Routes, Route } from 'react-router-dom';
import { NotFoundPage, AdvertisementPage, MainPage, OrderPage } from 'pages';
import { RoutePaths } from 'utils/routes/routes';
import { FilterLayout, MainLayout } from 'layouts';

function App() {
  return (
    <Routes>
      <Route path={RoutePaths.AllAdvertisements} element={<MainLayout />}>
        <Route path={RoutePaths.AllAdvertisements} element={<FilterLayout />}>
          <Route index element={<MainPage />} />
          <Route path={RoutePaths.Orders} element={<OrderPage />} />
        </Route>

        <Route path={RoutePaths.Advertisement(':id')} element={<AdvertisementPage />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
