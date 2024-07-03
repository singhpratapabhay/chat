import React from 'react';
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';

// Define PropTypes for the RHFAutoComplete component
RHFAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired, // Ensure options is required and is an array
    helperText: PropTypes.node,
};
export default function RHFAutoComplete({ name, label, options, multiple, freeSolo, ChipProps, helperText, ...other }) {
    const { control, setValue } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    multiple={multiple}
                    freeSolo={freeSolo}
                    options={options}
                    onChange={(event, newValue) => {
                        setValue(name, newValue, { shouldValidate: true });
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={label} error={!!error} helperText={error ? error.message : helperText} {...other} />
                    )}
                    ChipProps={ChipProps}
                />
            )}
        />
    );
}

