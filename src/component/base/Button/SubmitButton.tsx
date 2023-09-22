import React, {useMemo} from 'react';
// eslint-disable-next-line import/named
import {Button, ButtonProps, SxProps, Theme} from "@mui/material";
import {EColor, EFontColor} from "../../../constant";


interface ISubmitButtonProps extends Omit<ButtonProps, 'variant'> {
    variant?: 'border',
    component?: string,
}


const buttonBorderSx: SxProps = {
    borderColor: EColor.black,
    borderWidth: 2,
    borderStyle: 'solid',
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({children, variant, sx, ...props}) => {


    const buttonSx: SxProps<Theme> = {
        backgroundColor: EColor.lightMarine3,
        borderRadius: 4,
        fontWeight: 600,
        color: EFontColor.black,
        "&.MuiButtonBase-root:hover": {
            backgroundColor: EColor.lightMarine2,

        },
        ...(variant === 'border' ? buttonBorderSx : {}),
        ...sx,
    };

    return (
        <Button
            sx={buttonSx}
            {...props}
        >
            {children}
        </Button>
    );
};
