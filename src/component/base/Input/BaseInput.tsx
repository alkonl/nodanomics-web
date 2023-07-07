import React from "react";
import {TextField} from "@mui/material";
import {EFontColor} from "../../../constant";

export type  IBaseInputProps =
    Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        'type' |
        'placeholder' |
        'value' |
        'onChange' |
        'disabled' |
        'checked' |
        'className' |
        'id' |
        'name' |
        'autoFocus'
    >


export const BaseInput: React.FC<IBaseInputProps> = ({value, ...props}) => {

    return (
        <TextField
            sx={{
                width: '100%',
                height: 'fit-content',
            }}
            variant="outlined"
            inputProps={{
                sx: {
                    color: EFontColor.black,
                    padding: '6px',
                    border: 1,
                }
            }}
            value={value ? value : ''} {...props}/>
    );
}
