import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { colors, sizes } from 'utils/styles';
import { useModalStore } from 'store/index';
import { useAdvertisementFilterStore } from 'store/useFilterStore';


const SearchComponent: React.FC = () => {
  const setFilters = useAdvertisementFilterStore((store) => store.setFilters);
  const setOpen = useModalStore((store) => store.setOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isFirstRender = useRef(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedSearchTerm.length > 0) {
      setFilters({ name: debouncedSearchTerm });
    } else {
      setFilters({ name: undefined });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Box display='flex' alignItems='center' justifyContent='center' gap='10px' flexWrap='wrap'>
      <TextField
        variant='outlined'
        label='Введите текст для поиска'
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        sx={{ maxWidth: '300px', borderRadius: '20px' }}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={() => setOpen(true, 'advertisement')}
        sx={{
          maxWidth: '150px',
          bgcolor: colors.success,
          [`@media (max-width: ${sizes.tablet})`]: { display: 'none' },
        }}
      >
        Создать объявление
      </Button>
    </Box>
  );
};

export default SearchComponent;
