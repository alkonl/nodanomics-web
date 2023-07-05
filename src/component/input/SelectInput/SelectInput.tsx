import React from 'react';
import {MenuItem, Select} from "@mui/material";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export type  SelectInputOnChange= (e: SelectChangeEvent) => void
export type  SelectInputList = { id: string, name: string }[]

export const SelectInput: React.FC<{
    value?: string
    onChange?: SelectInputOnChange
    list?: SelectInputList
}> = ({value, onChange, list}) => {
    return (
        <Select
            sx={{
                width: '100%',
                height: '100%',
            }}
            size="small"
            value={value}
            defaultValue=""
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={onChange}
        >
            {list && list.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
        </Select>
    );
};
