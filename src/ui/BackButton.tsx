import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC<{ handleGoBack: () => void }> = ({ handleGoBack }) => (
  <IconButton sx={{ mb: 2 }} aria-label='back' onClick={handleGoBack}>
    <ArrowBackIcon />
  </IconButton>
);

export default BackButton;
