import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const CustomDescription: React.FC<{ description: string; maxRows?: number; maxChars?: number }> = ({
  description,
  maxRows = 3,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * maxRows;

      const isOverflowing = descriptionRef.current.scrollHeight > maxHeight;
      const isLongText = description.length > 100;

      setShowButton(isOverflowing || isLongText);
    }
  }, [description, maxRows, expanded]);

  const toggleExpanded = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Box mb='30px' textAlign='center'>
      <Typography
        ref={descriptionRef}
        variant='body1'
        color='text.secondary'
        sx={{
          mb: 1,
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxHeight: expanded ? 'none' : `${maxRows * 1.5}em`,
          lineHeight: '1.5em',
          whiteSpace: expanded ? 'normal' : 'nowrap',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
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
