import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { colors } from '../../utils/styles';

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant='h1' color='error' gutterBottom sx={{ color: colors.primary }}>
        404
      </Typography>
      <Typography variant='h6' gutterBottom>
        Страница не найдена. Вы будете перенаправлены на главную страницу через {countdown} секунд.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        component={Link}
        to='/'
        sx={{ mt: 2, background: colors.textSecondary, color: colors.primary }}
      >
        Вернуться на главную сейчас
      </Button>
    </Container>
  );
};

export default NotFoundPage;
