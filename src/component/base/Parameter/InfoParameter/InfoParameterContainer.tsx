import React from 'react';
import {Box, Typography} from "@mui/material";
import style from "./InfoParameter.module.scss";

export const InfoParameterContainer: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <Box className={style.infoParameterContainer}>
            {children}
        </Box>
    );
};
