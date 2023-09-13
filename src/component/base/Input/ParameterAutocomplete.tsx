import React from 'react';
import {Autocomplete, TextField} from "@mui/material";

export interface IParameterAutocompleteProps<Value = unknown> {
    value?: Value
    onChange?: (e: Value) => void
    readonly options?: Value[]
    label?: string
}

export const ParameterAutocomplete: React.FC<IParameterAutocompleteProps> = ({options = [], label, value = '', onChange}) => {
    console.log('ParameterAutocomplete', value)
    return (
        <Autocomplete
            sx={{
                width: '100%',
            }}
            disablePortal
            options={options}
            value={value}
            isOptionEqualToValue={() => true}
            renderInput={(params) => <TextField {...params} label={label}/>}
            onChange={(event, value)=>{
                if(onChange) {
                    onChange(value)
                }
            }}
        />
    );
};
