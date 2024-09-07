import { Box, Typography } from '@mui/material';

type InfoItemProps = {
  text: string;
  icon: React.ReactNode;
};

const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <Box display='flex' alignItems='center' gap='5px'>
    {icon}
    <Typography variant='body1'>{text}</Typography>
  </Box>
);

export default InfoItem;
