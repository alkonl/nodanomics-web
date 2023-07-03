import React from 'react';
import {Box, Typography} from "@mui/material";

export const AuthLayout: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flex: '1',
            }}
        >
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
            {children}
            </Box>
            <Box
                sx={{
                    flex: '1',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">
                    Image
                </Typography>
            </Box>
        </Box>
    );
};
