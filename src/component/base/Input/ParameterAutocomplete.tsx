import React from 'react';
import {Autocomplete, Paper, TextField, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
import {isObject} from "../../../utils";

export interface IParameterAutocompleteProps<Value = unknown> {
    value?: Value
    onChange?: (e: Value) => void
    readonly options?: Value[]
    label?: string
}


export const ParameterAutocomplete: React.FC<IParameterAutocompleteProps> = ({options = [], label, value = '', onChange}) => {
    return (
        <Autocomplete
            sx={{
                width: '100%',
                borderColor: 'white',
                color: EFontColor.lightMarine4,
                '&. .MuiAutocomplete-popper ': {
                    backgroundColor: 'red !important',
                }
            }}
            PaperComponent={({ children }) => (
                <Paper style={{ background: EColor.darkMarineLight }}>{children}</Paper>
            )}
            color={EColor.darkMarineLight}
            disablePortal
            options={options}
            value={value}
            isOptionEqualToValue={() => true}
            renderInput={(params) => <TextField
                sx={{
                    borderWidth: "2px",

                    borderColor: EColor.lightMarine2,
                    borderRadius: '8px',
                    borderStyle: 'solid',
                    '& .MuiOutlinedInput-root': {
                        color: EFontColor.lightMarine4,
                    },
                    '&:after': {
                        display: 'none',
                    },
                    '&:before': {
                        display: 'none',
                    },
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                            display: "none"
                        }
                    }
                }}

                {...params}

                label={label}/>}
            onChange={(event, value) => {
                if (onChange) {
                    onChange(value)
                }
            }}

            renderOption={(props, option) => {
                let  label: string | number = ''
                if (isObject(option) && 'label' in option && (typeof option.label === 'string' || typeof option.label === 'number')) {
                    label = option.label
                }
                return (
                    <Typography {...props} sx={{
                        color: EFontColor.grey2,
                        fontWeight: 500,
                    }}>
                        {label}
                    </Typography>

                );
            }}
        />
    );
};
