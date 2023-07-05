import React from 'react';
// eslint-disable-next-line import/named
import {Button, ButtonProps} from "@mui/material";
import {EColor} from "../../../constant";

export const SubmitButton: React.FC<ButtonProps> = ({children, sx, ...props}) => {
    return (
        <Button
            sx={{
                backgroundColor: EColor.grey2,
                borderRadius: 0,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
