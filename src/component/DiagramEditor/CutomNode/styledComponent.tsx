// eslint-disable-next-line import/named
import {styled, SxProps, Theme, Typography, TypographyProps} from "@mui/material";
import {EFontColor} from "../../../constant";
import React from "react";

type ITextType = 'text' | 'header'

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
    }
}

export const NodeTextName: React.FC<{
    children: React.ReactNode,
    sx?: SxProps<Theme>
    type?: ITextType
}> = ({
          children,
          sx,
          type = 'text'
      }) => {

    const baseSx = typeTextStyle[type]
    const outerSx = sx || {}
    const textSx: TypographyProps['sx'] = {
        ...baseSx,
        ...outerSx,
        color: EFontColor.grey2,
    } as TypographyProps['sx']

    return (<Typography
        sx={textSx}
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
