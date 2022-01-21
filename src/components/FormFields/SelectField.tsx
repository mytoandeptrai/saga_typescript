import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <FormControl
        variant="outlined"
        disabled={disabled}
        size="small"
        margin="normal"
        error={invalid}
        fullWidth
      >
        <InputLabel id={`${name}__label`}>{label}</InputLabel>
        <Select
          labelId={`${name}__label`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {<FormHelperText>{error?.message}</FormHelperText>}
      </FormControl>
    </>
  );
}
