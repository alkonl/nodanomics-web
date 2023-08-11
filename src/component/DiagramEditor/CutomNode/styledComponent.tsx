// eslint-disable-next-line import/named
import {styled, SxProps, Theme, Typography, TypographyProps} from "@mui/material";
import {EFontColor} from "../../../constant";
import React from "react";

type ITextType = 'text' | 'header' | 'small'

const typeTextStyle: {
    [key in ITextType]: SxProps<Theme>
} = {
    text: {
        fontSize: 10,
        fontWeight: 600,
    },
    header: {
        fontSize: 14,
        fontWeight: 600,
    },
    small: {
        fontSize: 8,
        fontWeight: 400,
        color: EFontColor.grey2,
    }
}

export const NodeTextName: React.FC<{
    children: React.ReactNode,
    type?: ITextType
} & TypographyProps> = (
    {
        children,
        sx,
        type = 'text',
        ...props
    }
) => {

    const baseSx = typeTextStyle[type]
    const outerSx = sx || {}
    const textSx: TypographyProps['sx'] = {
        ...baseSx,
        ...outerSx,
        color: EFontColor.grey2,
    } as TypographyProps['sx']

    return (<Typography
        sx={textSx}
        {...props}
    >
        {children}
    </Typography>)
}

const NodeTextValue = styled(Typography)(() => ({
    fontSize: 12,
    fontWeight: 600,
    color: EFontColor.white,
}))

export const NodeText = {
    Name: NodeTextName,
    Value: NodeTextValue,
}
