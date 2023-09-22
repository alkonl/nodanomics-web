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
                borderColor: EColor.lightMarine3,
                color: EColor.lightMarine3,
                '&.Mui-checked': {
                    color: EColor.lightMarine3,
                },
            }}/>
    );
};
