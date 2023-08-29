import React from 'react';
import {EColor} from "../../../constant";
// eslint-disable-next-line import/named
import {Checkbox, CheckboxProps} from "@mui/material";

export const ParameterCheckbox: React.FC<Pick<CheckboxProps, 'onChange' | 'checked'>> = (props) => {
    return (
        <Checkbox
            onChange={props.onChange}
            checked={props.checked || false}
            sx={{
                padding: 0,
                borderColor: EColor.grey2,
                color: EColor.grey2,
                '&.Mui-checked': {
                    color: EColor.grey2,
                },
            }}/>
    );
};
