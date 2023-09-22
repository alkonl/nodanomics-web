import React from 'react';
import {Box, Typography} from "@mui/material";
import {EFontColor} from "../../../../constant";

export const NodeName: React.FC<{
    children: React.ReactNode;
}> = ({children}) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: -15,
        }}>
            <Typography sx={{
                fontSize: 9,
                color: EFontColor.lightMarine4,
            }}>
                {children}
            </Typography>
        </Box>
    );
};

