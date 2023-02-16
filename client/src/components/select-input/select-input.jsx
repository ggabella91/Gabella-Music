import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

const SelectInput = ({
  options,
  selectedValue,
  setSelectedValue,
  defaultValue,
}) => {
  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
  };

  return (
    <Select
      onChange={handleOptionChange}
      value={selectedValue || 'select-option'}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }}
      sx={{ width: 250 }}
    >
      <MenuItem key={defaultValue} value='select-option' disabled>
        {defaultValue}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.displayValue}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
