import { CardMedia } from '@mui/material';
import { useState } from 'react';

type CustomImageProps = {
  imageUrl?: string;
  alt: string;
  height?: number;
};

const CustomImage: React.FC<CustomImageProps> = ({ imageUrl, alt, height = 140 }) => {
  const [imgSrc, setImgSrc] = useState<string>(imageUrl ? imageUrl : './');

  const handleImageError = () => {
    setImgSrc('/notFound.jpg');
  };

  return (
    <CardMedia
      component='img'
      height={height}
      image={imgSrc}
      alt={imgSrc === imageUrl ? alt : 'Not Found Img'}
      onError={handleImageError}
      sx={{ objectFit: 'cover', borderRadius: '8px' }}
    />
  );
};

export default CustomImage;
