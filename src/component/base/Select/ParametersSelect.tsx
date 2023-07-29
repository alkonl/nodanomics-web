import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export const ParametersSelect: React.FC<{
    currentValue: string,
    onChange: (event: SelectChangeEvent) => void,
    values: string[],
}> = ({currentValue, onChange,values}) => {
    return (
        <FormControl

            fullWidth
            size="small"
        >
            <InputLabel
                sx={{
                    color: EFontColor.grey4,
                }}
            />
            <Select
                value={currentValue}
                onChange={onChange}
                sx={{
                    color: EFontColor.grey4,
                    width: '100%',
                    flex: 1,
                    borderColor: EColor.grey2,
                    borderWidth: 3,
                    borderRadius: 0,
                    borderStyle: 'solid',
                    px: 0.5,
                    padding: 0,
                }}
            >
                {values.map((value) => (
                    <MenuItem
                        key={value}
                        value={value}
                        sx={{
                            color: EFontColor.grey4,
                        }}
                    >
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ParametersSelect;
