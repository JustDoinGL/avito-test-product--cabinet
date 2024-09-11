import React from 'react';
import { Modal, Box, Theme, SxProps, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { sizes, colors } from '../utils/styles';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ModalContent = styled(Box)({
  width: '80%',
  display: 'flex',
  justifyContent: 'center',
  maxHeight: '70%',
  maxWidth: '700px',
  overflow: 'auto',
  backgroundColor: colors.background,
  borderRadius: '20px',
  borderColor: colors.border,
  padding: '20px',
  position: 'relative',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  [`@media (max-width: ${sizes.tablet})`]: {
    boxSizing: 'border-box',
    width: ' 100vw',
    margin: '0 auto',
    paddingTop: '35px',
    paddingBottom: '20px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: '16px 16px 0 0',
  },
});

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, children, sx }) => {
  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      slotProps={{
        backdrop: { style: { backgroundColor: colors.background, opacity: 0.6 } },
      }}
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <ModalContent sx={sx}>
        <IconButton
          sx={{ position: 'absolute', top: '0', right: '5px' }}
          onClick={onClose}
          aria-label='Close modal'
        >
          <CloseIcon />
        </IconButton>

        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
