import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import { colors, sizes } from 'utils/styles';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Debounced Search Term:', debouncedSearchTerm);
      
    }
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
        onClick={() => {}}
        sx={{
          maxWidth: '100px',
          bgcolor: colors.success,
          [`@media (max-width: ${sizes.tablet})`]: { display: 'none' },
        }}
      >
        Создать задачу
      </Button>
    </Box>
  );
};

export default SearchComponent;
