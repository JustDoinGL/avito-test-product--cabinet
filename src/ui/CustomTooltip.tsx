import { SxProps, Theme, styled, Tooltip, TooltipProps, tooltipClasses  } from '@mui/material';
import React from 'react';

interface PromoteTooltipProps {
  children: React.ReactElement;
  title: React.ReactNode;
  styles?: SxProps<Theme>;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start';
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    display: 'none',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '6px 8px',
    borderRadius: '10px',
    backgroundColor: '#262633',
  },
  '& .MuiTypography-root': {
    fontFamily: 'var(--font-inter)',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: 2,
  },
});

export default function CustomTooltip({ children, title, placement = 'bottom-start', styles }: PromoteTooltipProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <StyledTooltip
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      placement={placement}
      title={title}
      open={open}
      onClose={handleMouseLeave}
      sx={{ [`& .${tooltipClasses.tooltip}`]: styles }}
    >
      {React.cloneElement(children, {
        onClick: handleClick,
      })}
    </StyledTooltip>
  );
}
