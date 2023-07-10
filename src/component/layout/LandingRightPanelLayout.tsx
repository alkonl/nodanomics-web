import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../constant";

export const LandingRightPanelLayout: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: EColor.grey2,
            borderStyle: 'solid',
            width: 350,
        }}>
            {children}
        </Box>
    );
};
