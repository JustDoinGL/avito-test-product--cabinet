import { useRef, useState, useEffect } from 'react';
import { Box, styled, SxProps, Theme, Typography } from '@mui/material';
import CustomTooltip from './CustomTooltip';

interface StyledTextProps {
  maxWidth: number;
  sx?: SxProps<Theme>;
}

const StyledText = styled(Typography)<StyledTextProps>(({ maxWidth, sx }) => ({
  maxWidth: `${maxWidth}px`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  sx,
}));

interface EllipsisTextProps {
  text: string;
  sx?: SxProps<Theme>;
}

const EllipsisText: React.FC<EllipsisTextProps> = ({ text, sx }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setMaxWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowed(textRef.current.scrollWidth > maxWidth);
    }
  }, [maxWidth, text]);

  return (
    <Box ref={containerRef} sx={{ width: '100%', margin: '0 auto' }}>
      <CustomTooltip title={isOverflowed ? text : ''} placement='top-start'>
        <StyledText ref={textRef} maxWidth={maxWidth} sx={sx}>
          {text}
        </StyledText>
      </CustomTooltip>
    </Box>
  );
};

export default EllipsisText;
