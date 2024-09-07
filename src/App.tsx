import { Routes, Route } from 'react-router-dom';
import { NotFoundPage, AdvertisementPage, MainPage, OrdersPage } from 'pages';
import { RoutePaths } from 'utils/routes/routes';
import { FilterLayout, MainLayout } from 'layouts';
import { ThemeProvider } from '@mui/material';
import { GlobalStyles, theme } from 'utils/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path={RoutePaths.AllAdvertisements} element={<MainLayout />}>
          <Route path={RoutePaths.AllAdvertisements} element={<FilterLayout />}>
            <Route index element={<MainPage />} />
            <Route path={RoutePaths.Orders} element={<OrdersPage />} />
          </Route>

          <Route path={RoutePaths.Advertisement(':id')} element={<AdvertisementPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
