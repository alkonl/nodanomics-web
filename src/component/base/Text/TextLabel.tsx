import React from 'react';
import {Typography} from "@mui/material";

export const TextLabel: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <Typography
        sx={{
            fontWeight: 'bold',
            width: 'fit-content'
        }}
        >
            {children}
        </Typography>
    );
};

