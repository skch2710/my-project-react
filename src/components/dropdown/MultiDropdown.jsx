import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Typography } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiDropdown = (props) => {
  const {
    label,
    options,
    getOptionLabel,
    onChange,
    value,
    defaultValue,
    isOptionEqualToValue,
    ...otherProps
  } = props;

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Autocomplete
        multiple
        limitTags={2}
        options={options}
        disableCloseOnSelect
        getOptionLabel={getOptionLabel}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        isOptionEqualToValue={isOptionEqualToValue} // added this
        renderOption={(props, option, { selected }) => {
          const { key, ...restProps } = props;
          return (
            <li key={key} {...restProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {getOptionLabel(option)}
            </li>
          );
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField placeholder={label} {...params} />}
        {...otherProps}
      />
    </Box>
  );
};

export default MultiDropdown;
