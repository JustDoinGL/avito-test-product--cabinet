import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type CustomStatusSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  title: string;
  statusOptions: {
    value: number;
    label: string;
  }[];
};

const CustomStatusSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  statusOptions,
  title,
}: CustomStatusSelectProps<TFieldValues>) => {
  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel id={`${String(name)}-label`}>{title}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            labelId={`${String(name)}-label`}
            value={field.value !== undefined ? field.value : ''} 
            onChange={(event: SelectChangeEvent<number>) => field.onChange(Number(event.target.value))}
            label={title}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default CustomStatusSelect;
