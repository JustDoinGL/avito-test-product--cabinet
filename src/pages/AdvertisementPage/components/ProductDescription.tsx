import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

const ProductDescription: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mb='30px'>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{
          mb: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: expanded ? 'none' : 3,
        }}
      >
        {description}
      </Typography>
      <Button
        variant='text'
        color='primary'
        onClick={toggleExpanded}
        sx={{ padding: 0, textTransform: 'none', margin: '0 auto' }}
      >
        {expanded ? 'Скрыть' : 'Читать далее'}
      </Button>
    </Box>
  );
};

export default ProductDescription;
