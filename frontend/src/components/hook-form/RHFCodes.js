import { Stack, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useFormContext, Controller } from "react-hook-form";

const RHFCodes = ({ keyName = '', inputs = [], ...other }) => {
    const codesRef = useRef(null);
    const { control } = useFormContext();

    const handleChangedWithNextField = (event, handleChange) => {
        const { maxLength, value, name } = event.target;
        const fieldIndex = name.replace(keyName, '');
        const fieldIntIndex = Number(fieldIndex);
        const nextField = document.querySelector(`input[name=${keyName}${fieldIntIndex + 1}]`);
        const prevField = document.querySelector(`input[name=${keyName}${fieldIntIndex - 1}]`);

        if (value.length > maxLength) {
            event.target.value = value.slice(0, maxLength);
        }

        handleChange(event);

        if (value.length >= maxLength && nextField !== null) {
            nextField.focus();
        } else if (value.length === 0 && prevField !== null) {
            prevField.focus();
        }
    };

    const handlePaste = (event, field) => {
        const pastedData = event.clipboardData.getData('text');
        if (pastedData.length === inputs.length) {
            const fields = document.querySelectorAll(`input[name^=${keyName}]`);
            fields.forEach((input, index) => {
                input.value = pastedData[index];
                const changeEvent = new Event('input', { bubbles: true });
                input.dispatchEvent(changeEvent);
            });
        }
        event.preventDefault();
    };

    return (
        <Stack direction={"row"} spacing={2} justifyContent={"center"} ref={codesRef}>
            {inputs.map((name, index) => (
                <Controller key={name} name={`${keyName}${index + 1}`} control={control} render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        error={!!error}
                        autoFocus={index === 0}
                        placeholder='-'
                        onChange={(event) => handleChangedWithNextField(event, field.onChange)}
                        onPaste={(event) => handlePaste(event, field)}
                        onFocus={(event) => event.currentTarget.select()}
                        InputProps={{
                            sx: {
                                width: { xs: 36, sm: 56 },
                                height: { xs: 36, sm: 56 },
                                '& input': { p: 0, textAlign: "center" }
                            }
                        }}
                        inputProps={{
                            maxLength: 1,
                            type: "number",
                        }}
                        {...other}
                    />
                )}>
                </Controller>
            ))}
        </Stack>
    );
};

export default RHFCodes;
