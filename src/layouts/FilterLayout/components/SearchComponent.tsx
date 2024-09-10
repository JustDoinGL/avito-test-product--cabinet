import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { colors, sizes } from 'utils/styles';
import { useModalStore } from 'store/index';
import { Filters } from 'store/useFilterStore';

type SearchComponentProps = {
  isMainPage: boolean;
  setFilters: (filters: Partial<Filters>) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ isMainPage, setFilters }) => {
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
      setFilters({ text: debouncedSearchTerm });
    } else {
      setFilters({ text: undefined });
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
      {isMainPage && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(true)}
          sx={{
            maxWidth: '150px',
            bgcolor: colors.success,
            [`@media (max-width: ${sizes.tablet})`]: { display: 'none' },
          }}
        >
          Создать объявление
        </Button>
      )}
    </Box>
  );
};

export default SearchComponent;
