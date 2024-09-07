import React from 'react';
import { CardContent, CardMedia, Typography } from '@mui/material';
import { Advertisement } from 'types/Advertisement';

interface AdvertisementInfoProps {
  content: Advertisement;
}

const AdvertisementInfo: React.FC<AdvertisementInfoProps> = ({ content }) => {
  const { name, description, price, views, likes, createdAt, imageUrl } = content;

  return (
    <>
      <CardMedia
        component='img'
        height='140'
        image={imageUrl || '/notFound.jpg'}
        alt={imageUrl ? name : 'Not Found Img'}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='h6' color='info' sx={{ marginTop: '10px' }}>
          {price} ₽
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Просмотров: {views} | Лайков: {likes}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Дата добавления: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </>
  );
};

export default AdvertisementInfo;
