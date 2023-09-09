import React from 'react';
import {Autocomplete, TextField} from "@mui/material";

export interface IParameterAutocompleteProps {
    value?: string
    onChange?: (e: any) => void
    readonly options?: string[]
    label?: string
}

export const ParameterAutocomplete: React.FC<IParameterAutocompleteProps> = ({options = [], label, value}) => {
    return (
        <Autocomplete
            sx={{
                width: '100%',
            }}
            disablePortal
            options={options}
            value={value}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    );
};
