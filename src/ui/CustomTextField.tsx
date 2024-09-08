import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, SxProps, Theme } from '@mui/material';
import { colors } from 'utils/styles';

interface CustomTextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  type?: 'text' | 'number';
  placeholder?: string;
  sx?: SxProps<Theme>;
}

const textFieldStyles: SxProps<Theme> = {
  p: 0,
  margin: 0,
  input: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '125%',
  },
  '& .Mui-error': {
    borderColor: colors.error,
    color: colors.error,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    borderColor: colors.border,
  },
};

const CustomTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  sx,
}: CustomTextFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          multiline
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          placeholder={placeholder}
          type={type}
          fullWidth
          margin='normal'
          variant='outlined'
          sx={{ ...textFieldStyles, ...sx }}
          value={field.value ?? ''}
        />
      )}
    />
  );
};

export default CustomTextField;
