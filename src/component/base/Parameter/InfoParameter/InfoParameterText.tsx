import React from 'react';
import {Typography} from "@mui/material";

export const InfoParameterText: React.FC<{ children: React.ReactNode }> = (
    {
        children
    }) => {
    return (
        <Typography>
            {children}
        </Typography>
    );
};
