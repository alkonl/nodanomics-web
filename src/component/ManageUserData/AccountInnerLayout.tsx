import React from 'react';
import {Box} from "@mui/material";

export const AccountInnerLayout: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    return (
        <Box>
            {children}
        </Box>
    );
};
