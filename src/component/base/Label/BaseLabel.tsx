import React from "react";
// eslint-disable-next-line import/named
import {Typography, TypographyProps} from "@mui/material";

export const BaseLabel: React.FC<{ text?: string } & TypographyProps> = ({text, ...props}) => {
    return (
        <Typography style={{
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '4px'
        }}
                    {...props}>{text}</Typography>
    )
}
