import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { colors, sizes } from 'utils/styles';
import useGlobalStore from 'store/useStore';
import { useAdvertisementStore } from 'store/useFilterStore';

type SearchComponentProps = {
  isMainPage: boolean;
};

const SearchComponent: React.FC<SearchComponentProps> = ({ isMainPage }) => {
  const setOpen = useGlobalStore((store) => store.setOpen);
  const setFilters = useAdvertisementStore((store) => store.setFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (isMainPage) {
      if (debouncedSearchTerm.length > 0) {
        setFilters({ text: debouncedSearchTerm });
      } else {
        setFilters({ text: undefined });
      }
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
