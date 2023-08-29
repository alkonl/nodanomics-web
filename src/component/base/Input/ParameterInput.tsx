import React from "react";
// eslint-disable-next-line import/named
import {InputProps} from "@mui/material/Input/Input";
import {Input} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";

export const ParameterInput: React.FC<InputProps> = ({sx, value, ...props}) => {

    return <Input
        value={value ? value : ''}
        sx={{
            color: EFontColor.grey4,
            width: '100%',
            flex: 1,
            borderColor: EColor.grey2,
            borderWidth: 3,
            borderRadius: 0,
            borderStyle: 'solid',
            px: 0.5,
            ...sx,
        }}
        {...props}/>
}
