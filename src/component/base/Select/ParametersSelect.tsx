import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export const ParametersSelect: React.FC<{
    currentValue?: string,
    onChange?: (event: SelectChangeEvent) => void,
    values?: string[] | {
        value: string,
        label: string,
    }[],
}> = ({currentValue, onChange, values}) => {
    return (
        <FormControl
            fullWidth
            size="small"
            sx={{
                maxWidth: '200px',
                boxSizing: 'border-box',
            }}
            id={`ParametersSelect-controller${currentValue}`}
        >

            <InputLabel
                sx={{
                    color: EFontColor.grey4,
                }}
            />
            <Select
                value={currentValue || ''}
                onChange={onChange}
                sx={{
                    color: EFontColor.grey4,
                    width: '100%',
                    maxWidth: '100%',
                    flex: 1,
                    borderColor: EColor.grey2,
                    borderWidth: 3,
                    borderRadius: 0,
                    borderStyle: 'solid',
                    px: 0.5,
                    padding: 0,
                }}
            >
                {values?.map((item) => {
                    if (typeof item === 'string') {
                        return (
                            <MenuItem
                                key={item}
                                value={item}
                                sx={{
                                    color: EFontColor.grey4,
                                }}
                            >
                                {item}
                            </MenuItem>
                        )
                    }
                    return <MenuItem
                        key={item.value}
                        value={item.value}
                        sx={{
                            color: EFontColor.grey4,
                        }}
                    >
                        {item.label}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default ParametersSelect;
