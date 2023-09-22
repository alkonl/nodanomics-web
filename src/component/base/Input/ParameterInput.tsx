import React from "react";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {Input} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";

export const ParameterInput: React.FC<InputProps> = ({sx, value, ...props}) => {

    return <Input
        value={value !== undefined ? value : ''}
        sx={{
            color: EFontColor.white,
            width: '100%',
            flex: 1,
            borderColor: EColor.lightMarine3,
            backgroundColor: EColor.darkMarine3,
            borderStyle: 'solid',
            borderRadius: 2,
            borderWidth: '1px',
            px: 0.5,
            '&:after': {
                display: 'none !important',
            },
            '&:before': {
                display: 'none !important',
            },
            ...sx,
        }}
        {...props}/>
}
