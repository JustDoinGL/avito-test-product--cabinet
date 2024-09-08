import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const CustomDescription: React.FC<{ description: string; maxRows?: number }> = ({ description, maxRows = 3 }) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * maxRows;
      setShowButton(descriptionRef.current.scrollHeight > maxHeight);
    }
  }, [description, maxRows]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mb='30px'>
      <Typography
        ref={descriptionRef}
        variant='body1'
        color='text.secondary'
        sx={{
          mb: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: expanded ? 'none' : maxRows,
        }}
      >
        {description}
      </Typography>
      {showButton && (
        <Button
          variant='text'
          color='primary'
          onClick={toggleExpanded}
          sx={{ padding: 0, textTransform: 'none', margin: '0 auto' }}
        >
          {expanded ? 'Скрыть' : 'Читать далее'}
        </Button>
      )}
    </Box>
  );
};

export default CustomDescription;
