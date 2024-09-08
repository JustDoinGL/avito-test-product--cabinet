import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const MainPage = () => {
  return (
    <>
      <Button
        onClick={() => {
          toast('ddd', {});
        }}
      >
        dddd
      </Button>
    </>
  );
};

export default MainPage;
