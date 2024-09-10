import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '0' }}>
      <Header />
      <Box mt={'20px'}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
