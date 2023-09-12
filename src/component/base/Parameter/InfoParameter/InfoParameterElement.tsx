import React from 'react';
import {Box, Typography} from "@mui/material";
import style from "./InfoParameter.module.scss";

export const InfoParameterElement: React.FC<{
    children: React.ReactNode
    label: string
}> = ({children, label}) => {
    return (
        <>
            <Typography className={style.infoParameterContainerKey}>
                {label}
            </Typography>
            <Box>
                {children}
            </Box>
        </>
    );
};
